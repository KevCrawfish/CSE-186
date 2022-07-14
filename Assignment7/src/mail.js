
const db = require('../test/db');

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

selectMails = async (req) => {
  let select = 'SELECT * FROM mail';
  let value = [ ];
  if (req.query.mailbox && req.query.from) {
    select += ` WHERE mailbox ~* $1`;
    select += ` AND mail->'from'->>'email' ~* $2`;
    select += ` OR mailbox ~* $1`;
    select += ` AND mail->'from'->>'name' ~* $2`;
    value = [ `${req.query.mailbox}`, `${req.query.from}`];
  } else if (req.query.mailbox) {
    select += ` WHERE mailbox ~* $1`;
    value = [ `${req.query.mailbox}` ];
  } else if (req.query.from) {
    select += ` WHERE mail->'from'->>'email' ~* $1`;
    select += ` OR mail->'from'->>'name' ~* $1`;
    value = [ `${req.query.from}`];
  }
  const query = {
    text: select,
    values: value
  };
  let { rows } = await pool.query(query);
  const mails = [];
  for (const row of rows) {
    const {content, ...cont} = row.mail;
    mails.push({name: row.mailbox, mail: cont});
  }
  return mails;
}

exports.getAll = async (req, res) => {
  const mail = await selectMails(req);
  if (mail.length !== 0) {
    res.status(200).json(mail);
  } else {
    res.status(404).send();
  }
};

exports.getById = async (req, res) => {
};

exports.getFrom = async (req, res) => {
};

exports.post = async (req, res) => {
};

exports.put = async (req, res) => {
};

