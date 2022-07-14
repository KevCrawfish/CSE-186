
const db = require('../test/db');

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

selectMails = async (box) => {
  let select = 'SELECT * FROM mail';
  if (box) {
    select += ` WHERE mailbox ~* $1`
  }
  const query = {
    text: select,
    values: box ? [ `${box}` ] : [ ]
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
  const mail = await selectMails(req.query.mailbox);
  res.status(200).json(mail);
};

exports.getById = async (req, res) => {
};

exports.getFrom = async (req, res) => {
};

exports.post = async (req, res) => {
};

exports.put = async (req, res) => {
};

