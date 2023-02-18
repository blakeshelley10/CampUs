package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username     string `json:"username"`
	Passwordhash string `json:"passwordhash"`
	Firstname    string `json:"firstname"`
	Lastname     string `json:"lastname"`
	Email        string `json:"email"`
}

func DBMigrate(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&User{})
	return db
}
