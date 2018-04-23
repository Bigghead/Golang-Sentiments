package utilities

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"time"

	"golang.org/x/oauth2/google"
	vision "google.golang.org/api/vision/v1"
)

// MakeImage : make image file with current time as file name
func MakeImage(image64 string) (string, error) {
	current := time.Now().UnixNano()

	// ===== turn int64 to string ===== //
	fileName := strconv.FormatInt(current, 10) + ".jpeg"

	// ===== create file ===== //
	newImage, err := os.Create(fileName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer newImage.Close()

	// ===== decode base64 string =====  //
	dec, err := base64.StdEncoding.DecodeString(image64)
	if err != nil {
		panic(err)
	}

	// ===== write decoded64 to file ===== //
	_, error := newImage.Write(dec)
	if err != nil {
		panic(error)
	}

	// ===== make sure the file is saved ===== //
	error = newImage.Sync()
	if err != nil {
		panic(error)
	}

	return fileName, err
}

//ReadImage : read image file and parses results from Google Vision
func ReadImage(filePath string) ([]byte, error) {

	data, err := ioutil.ReadFile(filePath)

	enc := base64.StdEncoding.EncodeToString(data)
	img := &vision.Image{Content: enc}

	feature := &vision.Feature{
		Type:       "FACE_DETECTION",
		MaxResults: 10,
	}

	req := &vision.AnnotateImageRequest{
		Image:    img,
		Features: []*vision.Feature{feature},
	}

	batch := &vision.BatchAnnotateImagesRequest{
		Requests: []*vision.AnnotateImageRequest{req},
	}

	ctx := context.Background()

	client, err := google.DefaultClient(ctx, vision.CloudPlatformScope)
	svc, err := vision.New(client)
	if err != nil {
		log.Fatal(err)
	}

	res, err := svc.Images.Annotate(batch).Do()
	if err != nil {
		log.Fatal(err)
	}

	err = DeleteImage(filePath)
	if err != nil {
		log.Fatal(err)
	}

	body, err := json.Marshal(res.Responses[0].FaceAnnotations)

	return body, err
}

//DeleteImage : delete image file
func DeleteImage(fileName string) error {
	err := os.Remove(fileName)
	if err != nil {
		return err
	}
	return nil
}
