-- Populate Your Tables Here --
DELETE FROM slug;
INSERT INTO slug (username, email, pass) VALUES ('Molly Member', 'molly@slugmail.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');
INSERT INTO slug (username, email, pass) VALUES ('Anna Admin', 'anna@slugmail.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze');

DELETE FROM mailbox;
INSERT INTO mailbox (owned_by, boxname) VALUES ('molly@slugmail.com', 'Inbox');
INSERT INTO mailbox (owned_by, boxname) VALUES ('anna@slugmail.com', 'Inbox');
INSERT INTO mailbox (owned_by, boxname) VALUES ('molly@slugmail.com', 'Trash');
INSERT INTO mailbox (owned_by, boxname) VALUES ('anna@slugmail.com', 'Trash');
INSERT INTO mailbox (owned_by, boxname) VALUES ('molly@slugmail.com', 'Sent');
INSERT INTO mailbox (owned_by, boxname) VALUES ('anna@slugmail.com', 'Sent');

DELETE FROM mail;
INSERT INTO mail (id, mail) SELECT mailbox.id, '{"to":{"name":"Molly Member","email":"molly@slugmail.com"},"from":{"name":"Keanu Reeves","email":"neo@ucsc.edu"},"received":"2020-11-17T23:17:19Z","sent":"2020-11-14T17:09:17Z","content":"I know kung fu.","subject":"The Matrix"}' FROM mailbox WHERE mailbox.boxname = 'Inbox' AND mailbox.owned_by = 'molly@slugmail.com';
INSERT INTO mail (id, mail) SELECT mailbox.id, '{"to":{"name":"Molly Member","email":"molly@slugmail.com"},"from":{"name":"Keanu Reeves","email":"ted@ucsc.edu"},"received":"2021-11-17T23:17:19Z","sent":"2021-11-14T17:09:17Z","content":"Be excellent to each other.","subject":"Bill and Ted"}' FROM mailbox WHERE mailbox.boxname = 'Inbox' AND mailbox.owned_by = 'molly@slugmail.com';
