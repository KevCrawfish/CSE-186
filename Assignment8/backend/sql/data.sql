-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

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
INSERT INTO mail (id, from_name, from_email, to_name, to_email, content, subject_line, sent_time, received_time) 
SELECT mailbox.id, 'Keanu Reeves', 'neo@slugmail.com', 'Molly Member', 'molly@slugmail.com', 'I know kung fu.', 'The Matrix', '2020-11-14T17:09:17Z', '2020-11-14T17:09:17Z'
FROM mailbox
WHERE mailbox.boxname = 'Inbox'
AND mailbox.owned_by = 'molly@slugmail.com';

INSERT INTO mail (id, from_name, from_email, to_name, to_email, content, subject_line, sent_time, received_time) 
SELECT mailbox.id, 'Keanu Reeves', 'ted@slugmail.com', 'Anna Admin', 'anna@slugmail.com', 'Be excellent to each other, and party on dudes.', `Bill & Ted's Excellent Adventure`, '2021-11-14T17:09:17Z', '2021-11-14T17:09:17Z'
FROM mailbox
WHERE mailbox.boxname = 'Inbox'
AND mailbox.owned_by = 'anna@slugmail.com';