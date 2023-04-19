//Provides a Golang Test Environment
//Tests can be executed by using "go test"
//The following functions test the controller functions used alongside a test sqlite database

package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/blakeshelley10/CampUs/api/models"
	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestRegisterUser(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test user
	testUser := models.User{Username: "mrandall24", Passwordhash: "Password123!", Firstname: "matt", Lastname: "randall", Email: "mr@gmail.com"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testUser); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/users", &b)

	//Call function
	RegisterUser(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusCreated {
		t.Errorf("Expected HTTP status code 201, got %d", wr.Code)
	}

	resultUser := models.User{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultUser); err3 != nil {
		t.Fatal(err3)
	}
	if resultUser.Username != testUser.Username {
		t.Errorf("Expected user %s, got %s", testUser.Username, resultUser.Username)
	}
}

func TestLogIn(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test user
	testUser := models.User{Username: "mrandall24", Passwordhash: "Password123!", Firstname: "matt", Lastname: "randall", Email: "mr@gmail.com"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testUser); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/users", &b)

	//Call function
	LogIn(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusCreated {
		t.Errorf("Expected HTTP status code 201, got %d", wr.Code)
	}

	resultUser := models.User{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultUser); err3 != nil {
		t.Fatal(err3)
	}
	if resultUser.Username != testUser.Username {
		t.Errorf("Expected user %s, got %s", testUser.Username, resultUser.Username)
	}
}

func TestCreateUser(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test user
	testUser := models.User{Username: "crandall24", Passwordhash: "password", Firstname: "matt", Lastname: "randall", Email: "mr@gmail.com"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testUser); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/users", &b)

	//Call function
	CreateUser(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusCreated {
		t.Errorf("Expected HTTP status code 201, got %d", wr.Code)
	}

	resultUser := models.User{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultUser); err3 != nil {
		t.Fatal(err3)
	}
	if resultUser.Username != testUser.Username {
		t.Errorf("Expected user %s, got %s", testUser.Username, resultUser.Username)
	}
}

func TestGetUser(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test user
	testUser := models.User{Username: "crandall24", Passwordhash: "Password123!", Firstname: "matt", Lastname: "randall", Email: "mr@gmail.com"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testUser); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/users", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "crandall24"})

	//Call function
	GetUser(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusOK {
		t.Errorf("Expected HTTP status code 200, got %d", wr.Code)
	}

	resultUser := models.User{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultUser); err3 != nil {
		t.Fatal(err3)
	}
	if resultUser.Username != testUser.Username {
		t.Errorf("Expected user %s, got %s", testUser.Username, resultUser.Username)
	}
}

func TestUpdateUser(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test user
	testUser := models.User{Username: "crandall24", Passwordhash: "Password123!", Firstname: "matt", Lastname: "randall", Email: "mr@gmail.com"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testUser); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/users", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "crandall24"})

	//Call function
	UpdateUser(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusOK {
		t.Errorf("Expected HTTP status code 200, got %d", wr.Code)
	}

	resultUser := models.User{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultUser); err3 != nil {
		t.Fatal(err3)
	}
	if resultUser.Username != testUser.Username {
		t.Errorf("Expected user %s, got %s", testUser.Username, resultUser.Username)
	}
}

func TestDeleteUser(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test user
	testUser := models.User{Username: "crandall24", Passwordhash: "Password123!", Firstname: "matt", Lastname: "randall", Email: "mr@gmail.com"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testUser); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/users", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "crandall24"})

	//Call function
	DeleteUser(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusNoContent {
		t.Errorf("Expected HTTP status code 204, got %d", wr.Code)
	}
}

func TestCreateEvent(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Call function
	CreateEvent(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusCreated {
		t.Errorf("Expected HTTP status code 201, got %d", wr.Code)
	}

	resultEvent := models.Event{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultEvent); err3 != nil {
		t.Fatal(err3)
	}
	if resultEvent.Name != testEvent.Name {
		t.Errorf("Expected event %s, got %s", testEvent.Name, resultEvent.Name)
	}
}

func TestGetEvent(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"name": "JobFair"})

	//Call function
	GetEvent(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusOK {
		t.Errorf("Expected HTTP status code 200, got %d", wr.Code)
	}

	resultEvent := models.Event{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultEvent); err3 != nil {
		t.Fatal(err3)
	}
	if resultEvent.Name != testEvent.Name {
		t.Errorf("Expected event %s, got %s", testEvent.Name, resultEvent.Name)
	}
}

func TestUpdateEvent(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"name": "JobFair"})

	//Call function
	UpdateEvent(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusOK {
		t.Errorf("Expected HTTP status code 200, got %d", wr.Code)
	}

	resultEvent := models.Event{}
	decoder := json.NewDecoder(wr.Body)
	if err3 := decoder.Decode(&resultEvent); err3 != nil {
		t.Fatal(err3)
	}
	if resultEvent.Name != testEvent.Name {
		t.Errorf("Expected event %s, got %s", testEvent.Name, resultEvent.Name)
	}
}

func TestDeleteEvent(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"name": "JobFair"})

	//Call function
	DeleteEvent(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusNoContent {
		t.Errorf("Expected HTTP status code 204, got %d", wr.Code)
	}
}

func TestCreateUserEvent(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair2", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "mrandall24"})

	//Call function
	CreateUserEvent(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusCreated {
		t.Errorf("Expected HTTP status code 201, got %d", wr.Code)
	}
}

func TestGetAllUserEvents(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair2", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "mrandall24"})

	//Call function
	GetAllUserEvents(testDB, wr, req)

	//Check response code and body
	if wr.Code != http.StatusOK {
		t.Errorf("Expected HTTP status code 200, got %d", wr.Code)
	}
}

func TestSaveEvents(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair2", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "mrandall24"})

	//Call function
	SaveEvents(testDB, wr, req)
}

func TestGetAllUserSavedEvents(t *testing.T) {

	//Open test database
	testdb, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		t.Fatal(err)
	}
	testDB := models.DBMigrate(testdb)

	//Create test event
	testEvent := models.Event{Name: "JobFair2", Date: "April 4, 2023", Time: "3:00 PM", Location: "O'Connell Center", Interests: "Networking, Professional Development"}

	//Create test request and recorder
	var b bytes.Buffer
	encoder := json.NewEncoder(&b)
	if err2 := encoder.Encode(testEvent); err2 != nil {
		t.Fatal(err2)
	}
	wr := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/events", &b)

	//Inject mux variables to simulate full URL request
	req = mux.SetURLVars(req, map[string]string{"username": "mrandall24"})

	//Call function
	GetAllUserSavedEvents(testDB, wr, req)
}
