package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/blakeshelley10/CampUs/api/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func CreateEvent(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	event := models.Event{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&event); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	defer r.Body.Close()

	checkEvent := models.Event{}
	db.Where("name = ? AND date = ? AND time = ? AND location = ? AND interests = ?", event.Name, event.Date, event.Time, event.Location, event.Interests).Find(&checkEvent)

	// Does the Find function find all structs with the same
	// structure or can it also find same info specifically?

	// FIX THIS
	if event.Name == checkEvent.Name {
		respondError(w, http.StatusInternalServerError, "Event has already been created.")
		return
	}

	if err := db.Save(&event).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, event)
}

func GetAllEvents(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	events := []models.Event{}
	db.Find(&events)
	respondJSON(w, http.StatusOK, events)
}

func GetEvent(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	// mux.Vars(r) is used to extract the variables from the incoming
	// request's URL. The variables are returned as a map where the keys
	// are the variable names defined in the URL path and the values are
	// the actual values specified in the request.
	vars := mux.Vars(r)

	// vars["username"] is used to extract the value of this variable.
	name := vars["name"]
	event := findEvent(db, name, w, r)
	if event == nil {
		return
	}
	respondJSON(w, http.StatusOK, event)
}

func findEvent(db *gorm.DB, name string, w http.ResponseWriter, r *http.Request) *models.Event {
	event := models.Event{}
	if err := db.Find(&event, models.Event{Name: name}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &event
}
