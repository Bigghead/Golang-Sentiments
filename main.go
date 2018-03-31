package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"

	routes "github.com/Bigghead/Golang-Sentiments/routes"
	vision "google.golang.org/api/vision/v1"
)

func main() {
	// readFile()

	routes.InitRoutes()

}

func readFile() {

	data, err := ioutil.ReadFile("assets/images/Rottweiler-1.jpg")

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
	fmt.Println(string(body))
}
