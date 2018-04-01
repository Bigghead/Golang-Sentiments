package routes

import (
	"log"
	"net/http"

	controllers "github.com/Bigghead/Golang-Sentiments/controllers"
)

func InitRoutes() {
	http.Handle("/", http.FileServer(http.Dir("./client")))
	http.HandleFunc("/test", controllers.GetHome)
	log.Fatal(http.ListenAndServe(":8000", nil))

}
