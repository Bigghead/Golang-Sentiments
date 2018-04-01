package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func GetHome(w http.ResponseWriter, r *http.Request) {
	test := map[string]string{"name": "testing"}
	json.NewEncoder(w).Encode(test)
}

func ParsePost(w http.ResponseWriter, r *http.Request) {

	// if r.Method == "POST" {
	fmt.Println(r.Method)
	json.NewEncoder(w).Encode(("hello"))
	// }
}
