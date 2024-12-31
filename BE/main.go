package main

import (
	"log"
	"wan-api-kol-event/Controllers"
	"wan-api-kol-event/Initializers"
	"github.com/gin-contrib/cors"
	"time"
	"github.com/gin-gonic/gin"
)
func init() {
	Initializers.LoadEnvironmentVariables()
	Initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/kols", Controllers.GetKolsController)

	// Run Gin server
	if err := r.Run(":8081"); err != nil {
		log.Println("Failed to start server")
	}
}
