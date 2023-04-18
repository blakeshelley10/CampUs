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

	db, err := gorm.Open(sqlite.Open("campusDB.db"), &gorm.Config{})
	if err != nil {
		log.Panic("Could not connect to database")
	}

	a.DB = models.DBMigrate(db)
	a.Router = mux.NewRouter()
	a.setRouters()
}

// Set all routers
func (a *App) setRouters() {
	//User CRUD routes
	a.Get("/api/users", a.GetAllUsers)
	a.Post("/api/users", a.CreateUser)
	a.Get("/api/users/{username}", a.GetUser)
	a.Put("/api/users/{username}", a.UpdateUser)
	a.Delete("/api/users/{username}", a.DeleteUser)

	//User authentication routes
	a.Post("/api/users/register", a.RegisterUser)
	a.Post("/api/users/login", a.LogIn)

	//Profile Pictures
	a.Get("/api/users/profilepicture/{username}", a.GetUserProfilePicture)
	a.Get("/api/events/profilepicture/{eventid}", a.GetUserEventPicture)

	//Event routes
	a.Post("/api/events", a.CreateEvent)
	a.Get("/api/events", a.GetAllEvents)
	a.Get("/api/events/{name}", a.GetEvent)
	a.Put("/api/events/{name}", a.UpdateEvent)
	a.Delete("/api/events/{name}", a.DeleteEvent)
	a.Post("/api/events/search", a.SearchEvent)
	a.Post("/api/events/create/{username}", a.CreateUserEvent)
	a.Get("/api/events/create/{username}", a.GetAllUserEvents)
	a.Get("/api/events/saved/{username}", a.GetAllUserSavedEvents)
	a.Post("/api/events/saved/{username}/{eventid}", a.SaveEvents)

	//File upload routes
	a.Post("/upload", a.UploadFile)
	a.Post("/api/upload/profilepicture/{username}", a.UploadUserPFP)
	a.Post("/api/upload/eventpicture/{eventid}", a.UploadUserEventPicture)
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

func (a *App) RegisterUser(w http.ResponseWriter, r *http.Request) {
	controllers.RegisterUser(a.DB, w, r)
}

func (a *App) LogIn(w http.ResponseWriter, r *http.Request) {
	controllers.LogIn(a.DB, w, r)
}

func (a *App) GetUserProfilePicture(w http.ResponseWriter, r *http.Request) {
	controllers.GetUserProfilePicture(a.DB, w, r)
}

// Handlers to manage event data
func (a *App) CreateEvent(w http.ResponseWriter, r *http.Request) {
	controllers.CreateEvent(a.DB, w, r)
}

func (a *App) GetEvent(w http.ResponseWriter, r *http.Request) {
	controllers.GetEvent(a.DB, w, r)
}

func (a *App) GetAllEvents(w http.ResponseWriter, r *http.Request) {
	controllers.GetAllEvents(a.DB, w, r)
}

func (a *App) UpdateEvent(w http.ResponseWriter, r *http.Request) {
	controllers.UpdateEvent(a.DB, w, r)
}

func (a *App) DeleteEvent(w http.ResponseWriter, r *http.Request) {
	controllers.DeleteEvent(a.DB, w, r)
}

func (a *App) SearchEvent(w http.ResponseWriter, r *http.Request) {
	controllers.SearchEvent(a.DB, w, r)
}

func (a *App) CreateUserEvent(w http.ResponseWriter, r *http.Request) {
	controllers.CreateUserEvent(a.DB, w, r)
}

func (a *App) GetAllUserEvents(w http.ResponseWriter, r *http.Request) {
	controllers.GetAllUserEvents(a.DB, w, r)
}

func (a *App) SaveEvents(w http.ResponseWriter, r *http.Request) {
	controllers.SaveEvents(a.DB, w, r)
}

func (a *App) GetAllUserSavedEvents(w http.ResponseWriter, r *http.Request) {
	controllers.GetAllUserSavedEvents(a.DB, w, r)
}

func (a *App) GetUserEventPicture(w http.ResponseWriter, r *http.Request) {
	controllers.GetUserEventPicture(a.DB, w, r)
}

// Handlers to manage image/file data
func (a *App) UploadFile(w http.ResponseWriter, r *http.Request) {
	controllers.UploadFile(w, r)
}

func (a *App) UploadUserPFP(w http.ResponseWriter, r *http.Request) {
	controllers.UploadUserPFP(a.DB, w, r)
}

func (a *App) UploadUserEventPicture(w http.ResponseWriter, r *http.Request) {
	controllers.UploadUserEventPicture(a.DB, w, r)
}

// Run http server
func (a *App) Run(host string) {
	log.Fatal(http.ListenAndServe(host, a.Router))
}
