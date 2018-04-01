package utilities

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"log"

	"golang.org/x/oauth2/google"
	vision "google.golang.org/api/vision/v1"
)

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
