-- Dummy table -
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
DROP TABLE IF EXISTS slug;
CREATE TABLE slug (
	username VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL,
	pass VARCHAR(255) NOT NULL,
	PRIMARY KEY(email)
);

DROP TABLE IF EXISTS mailbox;
CREATE TABLE mailbox (
	owned_by VARCHAR(100) NOT NULL,
	id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
	boxname VARCHAR(20),
	FOREIGN KEY(owned_by)
		REFERENCES slug(email)
);

DROP TABLE IF EXISTS mail;
CREATE TABLE mail (
	id UUID NOT NULL,
	mail jsonb,
	FOREIGN KEY(id)
		REFERENCES mailbox(id)
);
