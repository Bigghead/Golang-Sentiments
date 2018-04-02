package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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
		data, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
			panic(err)
		}
		defer r.Body.Close()

		type jsonImage struct{ Image string }
		jsonImg := jsonImage{}
		err = json.Unmarshal(data, &jsonImg)
		image := jsonImg.Image

		// ===== split base64 string 'data:img'.... ===== //
		b64data := string(image)[strings.IndexByte(string(image), ',')+1:]

		imageFile, err := util.MakeImage(b64data)
		if err != nil {
			panic(err)
		}

		recognitions, err := util.ReadImage(imageFile)
		if err != nil {
			panic(err)
		}

		json.NewEncoder(w).Encode(string(recognitions))
	}
}
