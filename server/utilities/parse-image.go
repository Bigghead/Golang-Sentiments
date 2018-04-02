package utilities

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"

	"golang.org/x/oauth2/google"
	vision "google.golang.org/api/vision/v1"
)

func makeImage(image64 string) (string, error) {
	current := time.Now().UnixNano()
	fileName := string(current) + ".jpeg"

	newImage, err := os.Create(fileName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer newImage.Close()

	return fileName, err
}

//ReadImage : read image file and parses results from Google Vision
func ReadImage(filePath string) ([]byte, error) {

	data, err := ioutil.ReadFile(filePath)

	enc := base64.StdEncoding.EncodeToString(data)
	img := &vision.Image{Content: enc}

	feature := &vision.Feature{
		Type:       "LABEL_DETECTION",
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

	body, err := json.Marshal(res.Responses[0].LabelAnnotations)

	return body, err
}
