// Defines an HTTP server application that handles user data by creating,
// reading, updating, and deleting user information in a SQLite database.

package app

import (
	"log"
	"net/http"

	"github.com/blakeshelley10/CampUs/api/controllers"
	"github.com/blakeshelley10/CampUs/api/models"
	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Server container
type App struct {
	Router *mux.Router
	DB     *gorm.DB
}

// Opens database and router
func (a *App) Initialize() {

	db, err := gorm.Open(sqlite.Open("campususers.db"), &gorm.Config{})
	if err != nil {
		log.Panic("Could not connect to database")
	}

	a.DB = models.DBMigrate(db)
	a.Router = mux.NewRouter()
	a.setRouters()
}

// Set all routers
func (a *App) setRouters() {
	a.Get("/users", a.GetAllUsers)
	a.Post("/users", a.CreateUser)
	a.Get("/users/{username}", a.GetUser)
	a.Put("/users/{username}", a.UpdateUser)
	a.Delete("/users/{username}", a.DeleteUser)
}

// Router wrapper functions
func (a *App) Get(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("GET")
}

func (a *App) Post(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("POST")
}

func (a *App) Put(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("PUT")
}

func (a *App) Delete(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("DELETE")
}

// Handlers to manage user data
func (a *App) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	controllers.GetAllUsers(a.DB, w, r)
}

func (a *App) CreateUser(w http.ResponseWriter, r *http.Request) {
	controllers.CreateUser(a.DB, w, r)
}

func (a *App) GetUser(w http.ResponseWriter, r *http.Request) {
	controllers.GetUser(a.DB, w, r)
}

func (a *App) UpdateUser(w http.ResponseWriter, r *http.Request) {
	controllers.UpdateUser(a.DB, w, r)
}

func (a *App) DeleteUser(w http.ResponseWriter, r *http.Request) {
	controllers.DeleteUser(a.DB, w, r)
}

// Run http server
func (a *App) Run(host string) {
	log.Fatal(http.ListenAndServe(host, a.Router))
}
