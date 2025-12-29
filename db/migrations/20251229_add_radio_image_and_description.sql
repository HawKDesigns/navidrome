-- +goose Up
-- +goose StatementBegin

ALTER TABLE radio ADD COLUMN IF NOT EXISTS image_url VARCHAR(1024) DEFAULT '';
ALTER TABLE radio ADD COLUMN IF NOT EXISTS description VARCHAR(1024) DEFAULT '';

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

ALTER TABLE radio DROP COLUMN IF EXISTS image_url;
ALTER TABLE radio DROP COLUMN IF EXISTS description;

-- +goose StatementEnd
