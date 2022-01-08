CREATE DATABASE comand_project_retro
    WITH 
    OWNER = postgres
    TABLESPACE = pg_default;
   
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE films(
	id serial PRIMARY KEY,
	original_title varchar(254) NOT NULL,
	popularity REAL,
	video boolean,
	adult boolean,
	imdb_id varchar(100),
	backdrop_path varchar(254),
	belongs_to_collection varchar(254),
	budget int,
	homepage varchar(254),
	original_language varchar(10),
	overview text,
	poster_path varchar(254),
	release_date varchar(254),
	revenue int,
	runtime int,
	status varchar(254),
	tagline varchar(254),
	title text,
	vote_average REAL,
	vote_count REAL
);

DELETE FROM films WHERE status IS NULL ;

CREATE TABLE users (
 id serial PRIMARY KEY,
 login varchar(254) UNIQUE NOT NULL,
 password varchar(254),
 first_name varchar(254),
 last_name varchar(254),
 email varchar(254),
 user_role varchar(50),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


INSERT INTO users (first_name, last_name, login, password)
                       VALUES ('Anton', 'Felix','ssmnemon', 'passw0rd')
                       RETURNING login;
                      
SELECT password FROM users 
WHERE login = 'cryptedpassword';
