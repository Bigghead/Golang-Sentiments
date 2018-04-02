package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func GetHome(w http.ResponseWriter, r *http.Request) {
	test := map[string]string{"name": "testing"}
	json.NewEncoder(w).Encode(test)
}

func ParsePost(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		// fmt.Println(r.Method)
		// json.NewEncoder(w).Encode(("hello"))
		data, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		defer r.Body.Close()

		jsonBody, err := json.Marshal(data)
		if err != nil {
			os.Exit(1)
		}

		fmt.Println(string(jsonBody))
	}
}
