const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// https://www.uuidtools.com/what-is-uuid
// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
const uuid = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-' +
             '[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

selectMails = async (req) => {
  let select = 'SELECT * FROM mail';
  let value = [];
  if (req.query.mailbox && req.query.from) {
    select += ` WHERE mailbox ~* $1`;
    select += ` AND mail->'from'->>'email' ~* $2`;
    select += ` OR mailbox ~* $1`;
    select += ` AND mail->'from'->>'name' ~* $2`;
    value = [`${req.query.mailbox}`, `${req.query.from}`];
  } else if (req.query.mailbox) {
    select += ` WHERE mailbox ~* $1`;
    value = [`${req.query.mailbox}`];
  } else if (req.query.from) {
    select += ` WHERE mail->'from'->>'email' ~* $1`;
    select += ` OR mail->'from'->>'name' ~* $1`;
    value = [`${req.query.from}`];
  }
  const query = {
    text: select,
    values: value,
  };
  const {rows} = await pool.query(query);
  const mails = [];
  for (const row of rows) {
    const {content, ...cont} = row.mail;
    if (content) {} // lint
    mails.push({name: row.mailbox, id: row.id, mail: cont});
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

selectMail = async (id) => {
  const select = 'SELECT * FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1 ?
    ({name: rows[0].mailbox, id: rows[0].id, mail: rows[0].mail}) :
       undefined;
};

exports.getById = async (req, res) => {
  if (req.params.id.match(uuid)) {
    const mail = await selectMail(req.params.id);
    if (mail) {
      res.status(200).json(mail);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
};

insertMail = async (Mail) => {
  const insert = 'INSERT INTO mail(mailbox, mail) VALUES ($1, $2)';
  const query = {
    text: insert,
    values: ['sent', Mail],
  };
  await pool.query(query);
};

exports.post = async (req, res) => {
  if (req.body) {
    const date = new Date();
    req.body.from = {name: 'CSE186 Student',
      email: 'CSE186student@ucsc.edu'};
    // https://stackoverflow.com/questions/34053715/how-to-output-date-in-javascript-in-iso-8601-without-milliseconds-and-with-z
    req.body.received = date.toISOString().slice(0, -5)+'Z';
    req.body.sent = date.toISOString().slice(0, -5)+'Z';
    await insertMail(req.body);
    res.status(201).send(req.body);
  } else {
    return res.status(400).send();
  }
};

moveMail = async (req) => {
  const update = 'UPDATE mail SET mailbox = $1 WHERE id = $2';
  const query = {
    text: update,
    values: [ `${req.query.mailbox}` , `${req.params.id}` ],
  };
  return await pool.query(query);
};

exports.put = async (req, res) => {
  if (req.params.id.match(uuid)) {
    const target = await selectMail(req.params.id);
    if (target) {
      if (target.mailbox != 'sent' && req.query.mailbox == 'sent') {
        res.status(409).send();
      } else {
        const mail = await moveMail(req);
        if (mail) {
          res.status(204).send();
        }
      }
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
};

