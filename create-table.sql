CREATE DATABASE comand_project_retro
    WITH 
    OWNER = postgres
    TABLESPACE = pg_default;

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


