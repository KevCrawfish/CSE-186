const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

selectMails = async (req) => {
  let select = 'SELECT * FROM mail';
  let value = [];
  if (req.query.mailbox) {
    select += ` WHERE id = (`;
    select += ` SELECT id FROM mailbox`;
    select += ` WHERE lower(boxname) = $1`;
    select += ` AND owned_by = $2)`;
    value = [`${req.query.mailbox}`, `${req.user.email}`];
  }
  const query = {
    text: select,
    values: value,
  };
  const {rows} = await pool.query(query);
  const mails = [];
  for (const row of rows) {
    mails.push({mail: row.mail});
  }

  return mails;
};

exports.getAll = async (req, res) => {
  const mail = await selectMails(req);
  if (mail.length !== 0) {
    res.status(200).json(mail);
  } else {
    res.status(404).send();
  }
};

