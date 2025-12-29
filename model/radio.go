package model

import "time"

type Radio struct {
	ID          string    `structs:"id"            json:"id"`
	StreamUrl   string    `structs:"stream_url"    json:"streamUrl"`
	Name        string    `structs:"name"          json:"name"`
	HomePageUrl string    `structs:"home_page_url" json:"homePageUrl"`
	CreatedAt   time.Time `structs:"created_at"    json:"createdAt"`
	UpdatedAt   time.Time `structs:"updated_at"    json:"updatedAt"`

	// New optional fields:
	ImageUrl    string    `structs:"image_url"     json:"imageUrl,omitempty"`    // local public path (/radios/images/<file>) or external http(s) URL
	Description string    `structs:"description"   json:"description,omitempty"` // optional description
}

type Radios []Radio

type RadioRepository interface {
	ResourceRepository
	CountAll(options ...QueryOptions) (int64, error)
	Delete(id string) error
	Get(id string) (*Radio, error)
	GetAll(options ...QueryOptions) (Radios, error)
	Put(u *Radio) error
}
