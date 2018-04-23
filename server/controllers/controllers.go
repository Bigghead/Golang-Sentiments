package controllers

import (
	"encoding/json"
	"net/http"
	"strings"

	util "github.com/Bigghead/Golang-Sentiments/server/utilities"
)

func GetHome(w http.ResponseWriter, r *http.Request) {
	test := map[string]string{"name": "testing"}
	json.NewEncoder(w).Encode(test)
}

func ParsePost(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		// ===== Better way to parse json??? ==== //
		// err = json.NewDecoder(r.Body).Decode(jsonImg)

		type jsonImage struct{ Image string }
		img2 := jsonImage{}

		err := json.NewDecoder(r.Body).Decode(&img2)
		if err != nil {
			panic(err)
		}
		imageString := img2.Image

		defer r.Body.Close()

		// ===== split base64 string 'data:img'.... ===== //
		b64data := string(imageString)[strings.IndexByte(string(imageString), ',')+1:]

		imageFile, err := util.MakeImage(b64data)
		if err != nil {
			panic(err)
		}

		recognitions, err := util.ReadImage(imageFile)
		if err != nil {
			panic(err)
		}

		err = util.DeleteImage(imageFile)
		if err != nil {
			panic(err)
		}

		json.NewEncoder(w).Encode(string(recognitions))
	}
}
