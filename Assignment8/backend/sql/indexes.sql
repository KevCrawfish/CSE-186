-- Index Your Tables Here --
CREATE UNIQUE INDEX lower_case_mailbox ON mailbox ((lower(boxname)));