package main

import (
	"fmt"
	"os"

	routes "github.com/Bigghead/Golang-Sentiments/server/routes"
	utils "github.com/Bigghead/Golang-Sentiments/server/utilities"
)

func main() {
	detection, err := utils.ReadImage("server/assets/images/Rottweiler-1.jpg")
	if err != nil {
		os.Exit(1)
	}
	fmt.Println(string(detection))

	routes.InitRoutes()

}
