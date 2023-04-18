package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/blakeshelley10/CampUs/api/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	//"gorm.io/datatypes"
)

// Creates event and saves it under user's account
func CreateUserEvent(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]
	user := findUser(db, username, w, r)
	if user == nil {
		return
	}

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

	// Adds created event to the u ser who created it
	//user.CreatedEvents[event.ID] = struct{}{}
	user.CreatedEvents = append(user.CreatedEvents, strconv.FormatUint(uint64(event.ID), 10)) //strconv.FormatUint(uint64(event.ID), 10)
	fmt.Printf(strconv.FormatUint(uint64(event.ID), 10))

	// Update User
	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	event.Identification = (strconv.FormatUint(uint64(event.ID), 10))
	if err := db.Save(&event).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusCreated, "Creating Events Works")
}

// Gets all events created by specific user
func GetAllUserEvents(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	// mux.Vars(r) is used to extract the variables from the incoming
	// request's URL. The variables are returned as a map where the keys
	// are the variable names defined in the URL path and the values are
	// the actual values specified in the request.
	vars := mux.Vars(r)
	username := vars["username"]
	user := findUser(db, username, w, r)
	if user == nil {
		fmt.Printf("FAIL")
		return
	}

	// for i := 0; i < len(user.CreatedEvents); i++ {
	// 	fmt.Printf(user.CreatedEvents[i])
	// }

	events := []models.Event{}

	for i := 0; i < len(user.CreatedEvents); i++ {
		event := findEventID(db, user.CreatedEvents[i], w, r)
		fmt.Print(event.Name)
		events = append(events, *event)
		fmt.Println(i)
	}

	respondJSON(w, http.StatusOK, events)
}

// Allows users to save events to view later
func SaveEvents(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)

	// username := vars["username"]
	// user := findUser(db, username, w, r)
	// if user == nil {
	// 	return
	// }

	//eventid := vars["eventid"]

	//id := StringToUint(eventid)

	//event := findEventID(db, id, w, r)
	//if event == nil {
	//	return
	//}

	//user.SavedEvents[event.ID] = struct{}{}
	//user.CreatedEvents = append(user.CreatedEvents, string(rune(event.ID)))

	//respondJSON(w, http.StatusOK, "Saving Events Works")

	vars := mux.Vars(r)
	username := vars["username"]
	user := findUser(db, username, w, r)
	if user == nil {
		return
	}

	// event := models.Event{}
	eventid := vars["eventid"]
	event := findEventID(db, eventid, w, r)
	if event == nil {
		return
	}

	// decoder := json.NewDecoder(r.Body)
	// if err := decoder.Decode(&event); err != nil {
	// 	respondError(w, http.StatusBadRequest, err.Error())
	// 	return
	// }

	// defer r.Body.Close()

	// checkEvent := models.Event{}
	// db.Where("name = ? AND date = ? AND time = ? AND location = ? AND interests = ?", event.Name, event.Date, event.Time, event.Location, event.Interests).Find(&checkEvent)

	// // Does the Find function find all structs with the same
	// // structure or can it also find same info specifically?

	// // FIX THIS
	// if event.Name == checkEvent.Name {
	// 	respondError(w, http.StatusInternalServerError, "Event has already been created.")
	// 	return
	// }

	// if err := db.Save(&event).Error; err != nil {
	// 	respondError(w, http.StatusInternalServerError, err.Error())
	// 	return
	// }

	// Adds created event to the u ser who created it
	user.SavedEvents = append(user.SavedEvents, strconv.FormatUint(uint64(event.ID), 10)) //strconv.FormatUint(uint64(event.ID), 10)
	fmt.Printf(strconv.FormatUint(uint64(event.ID), 10))

	// Update User
	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// event.Identification = (strconv.FormatUint(uint64(event.ID), 10))
	// if err := db.Save(&event).Error; err != nil {
	// 	respondError(w, http.StatusInternalServerError, err.Error())
	// 	return
	// }

	respondJSON(w, http.StatusCreated, "Saving Events Works")

}

// Returns all events saved by the user
func GetAllUserSavedEvents(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	// mux.Vars(r) is used to extract the variables from the incoming
	// request's URL. The variables are returned as a map where the keys
	// are the variable names defined in the URL path and the values are
	// the actual values specified in the request.
	vars := mux.Vars(r)
	username := vars["username"]
	user := findUser(db, username, w, r)
	if user == nil {
		return
	}

	events := []models.Event{}

	for i := 0; i < len(user.SavedEvents); i++ {
		event := findEventID(db, user.SavedEvents[i], w, r)
		if event == nil {
			return
		}
		fmt.Print(event.Name)
		events = append(events, *event)
		fmt.Println(i)
	}

	respondJSON(w, http.StatusOK, events)
}

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

	// vars["name"] is used to extract the value of this variable.
	name := vars["name"]
	event := findEvent(db, name, w, r)
	if event == nil {
		return
	}
	respondJSON(w, http.StatusOK, event)
}

func UpdateEvent(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	event := findEvent(db, name, w, r)
	if event == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&event); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&event).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusOK, event)
}

func DeleteEvent(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	name := vars["name"]
	event := findEvent(db, name, w, r)
	if event == nil {
		return
	}
	if err := db.Delete(&event).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

func SearchEvent(db *gorm.DB, w http.ResponseWriter, r *http.Request) {

	event := models.Event{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&event); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}

	defer r.Body.Close()

	allEvents := []models.Event{}

	where := buildWhereClause(&event)

	db.Where(where).Find(&allEvents)

	// Or for individual events

	//db.Where(db.Where("name LIKE ?", event.Name).Where(db.Where("date LIKE ?", event.Date).Or("time LIKE ?", event.Time).Or("location LIKE ?", event.Location).Or("interests LIKE ?", event.Interests))).Find(allEvents)
	// db.Where("name LIKE ?", event.Name).Find(&allEvents)
	// db.Where("date LIKE ?", event.Date).Find(&allEvents)
	// db.Where("time LIKE ?", event.Time).Find(&allEvents)
	// db.Where("location LIKE ?", event.Location).Find(&allEvents)
	// db.Where("interests LIKE ?", event.Interests).Find(&allEvents)

	// db.Where(db.Where("name LIKE ?", event.Name).Where(db.Where("date LIKE ?", event.Date).Or("time LIKE ?", event.Time).Or("location LIKE ?", event.Location).Or("interests LIKE ?", event.Interests))).Find(&allEvents)

	//db.Where("name LIKE ? AND date LIKE ? AND time LIKE ? AND location LIKE ? AND interests LIKE ?", event.Name, event.Date, event.Time, event.Location, event.Interests).Find(&allEvents)

	respondJSON(w, http.StatusOK, allEvents)
}

func GetUserEventPicture(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	// vars["username"] is used to extract the value of this variable.
	eventid := vars["eventid"]
	event := findEventID(db, eventid, w, r)
	if event == nil {
		return
	}
	fmt.Println(event.ProfilePicturePath)
	respondJSON(w, http.StatusOK, event.ProfilePicturePath)
}

func findEvent(db *gorm.DB, name string, w http.ResponseWriter, r *http.Request) *models.Event {
	event := models.Event{}
	if err := db.Find(&event, models.Event{Name: name}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &event
}

func findEventID(db *gorm.DB, id string, w http.ResponseWriter, r *http.Request) *models.Event {
	event := models.Event{}
	if err := db.Find(&event, models.Event{Identification: id}).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &event
}

// Helper function for SearchEvent function
func buildWhereClause(e *models.Event) string {
	var temp []string
	if e.Name != "" {
		temp = append(temp, "name LIKE '%"+e.Name+"%'")
	}
	if e.Date != "" {
		temp = append(temp, "date LIKE '%"+e.Date+"%'")
	}
	if e.Time != "" {
		temp = append(temp, "time LIKE '%"+e.Time+"%'")
	}
	if e.Location != "" {
		temp = append(temp, "location LIKE '%"+e.Location+"%'")
	}
	if e.Interests != "" {
		temp = append(temp, "interests LIKE '%"+e.Interests+"%'")
	}
	return strings.Join(temp, " AND ")
}

func StringToUint(s string) uint {
	i, _ := strconv.Atoi(s)
	return uint(i)
}
