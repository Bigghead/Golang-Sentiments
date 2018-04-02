package main

import (
	routes "github.com/Bigghead/Golang-Sentiments/server/routes"
)

func main() {
	// detection, err := utils.ReadImage("server/assets/images/Rottweiler-1.jpg")
	// if err != nil {
	// 	os.Exit(1)
	// }

	routes.InitRoutes()

}
