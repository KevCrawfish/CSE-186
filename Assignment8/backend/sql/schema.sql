-- Dummy table -
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
DROP TABLE IF EXISTS slug;
CREATE TABLE slug (
	username VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL,
	pass VARCHAR(255) NOT NULL
);
