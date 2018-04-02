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

		// ===== split base64 string 'data:img'.... ===== //
		b64data := string(data)[strings.IndexByte(string(data), ',')+1:]

		// json.NewEncoder(w).Encode(b64data)
		util.MakeImage(b64data)
	}
}
