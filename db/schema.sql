DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS stories;

CREATE TABLE users(
    id serial PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    stories_array array,
    likes_array array
);

CREATE TABLE stories(
    id serial PRIMARY KEY,
    title text NOT NULL,
    genre text NOT NULL,
    body_text text NOT NULL,
    likes integer NOT NULL,
    upload_date date NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
