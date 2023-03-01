package main

import "github.com/blakeshelley10/CampUs/api/app"

func main() {
	app := &app.App{}
	app.Initialize()
	app.Run(":3000")
}
