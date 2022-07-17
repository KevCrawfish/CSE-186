-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

-- Populate Your Tables Here --
DELETE FROM slug;
INSERT INTO slug (username, email, pass) VALUES ('Molly Member', 'molly@slugmail.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y');
INSERT INTO slug (username, email, pass) VALUES ('Anna Admin', 'anna@slugmail.com', '$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze');