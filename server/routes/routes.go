package routes

import (
	"log"
	"net/http"

	controllers "github.com/Bigghead/Golang-Sentiments/server/controllers"
)

func InitRoutes() {
	http.Handle("/", http.FileServer(http.Dir("./client")))
	http.HandleFunc("/test", controllers.GetHome)
	http.HandleFunc("/send", controllers.ParsePost)
	log.Fatal(http.ListenAndServe(":8000", nil))

}
