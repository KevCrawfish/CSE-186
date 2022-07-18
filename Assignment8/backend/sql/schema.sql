-- Your database schema goes here --
DROP TABLE IF EXISTS mail;
DROP TABLE IF EXISTS mailbox;
DROP TABLE IF EXISTS slug;

CREATE TABLE slug (username VARCHAR(255) NOT NULL, email VARCHAR(100) NOT NULL, pass VARCHAR(255) NOT NULL, PRIMARY KEY(email));
CREATE TABLE mailbox (owned_by VARCHAR(100) NOT NULL, id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), boxname VARCHAR(20), FOREIGN KEY(owned_by) REFERENCES slug(email));
CREATE TABLE mail (id UUID NOT NULL, uqid UUID UNIQUE DEFAULT gen_random_uuid(), mail jsonb, FOREIGN KEY(id) REFERENCES mailbox(id));
