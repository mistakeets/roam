CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR (100),
password VARCHAR (100),
name VARCHAR (50),
date_joined DATE 
);

CREATE TABLE cities (
id SERIAL PRIMARY KEY,
name VARCHAR (100)
);


CREATE TABLE posts (
id SERIAL PRIMARY KEY, 
title VARCHAR (140),
post_body VARCHAR (2000),
user_id SERIAL REFERENCES users (id),
city_id SERIAL REFERENCES cities (id)
);

CREATE TABLE post_comments (
id SERIAL PRIMARY KEY,
comment_body varchar (1000),
post_id SERIAL REFERENCES posts (id),
user_id SERIAL REFERENCES users (id)
);

ALTER TABLE users ADD COLUMN current_city SERIAL REFERENCES cities (id);
