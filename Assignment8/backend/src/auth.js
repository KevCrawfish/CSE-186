const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secrets = require('../data/secrets.json');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const selectUser = async (email, password) => {
  const select = 'SELECT * FROM slug WHERE email = $1';
  const query = {
    text: select,
    values: [`${email}`],
  };
  const {rows} = await pool.query(query);
  if (rows[0]) {
    return rows[0].email === email &&
    bcrypt.compareSync(password, rows[0].pass) ? rows[0] : undefined;
  } else {
    return undefined;
  }
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const user = await selectUser(email, password);
  if (user) {
    const accessToken = jwt.sign(
      {email: user.email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    res.status(200).json({name: user.username, accessToken: accessToken});
  } else {
    res.status(401).send('Invalid credentials');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secrets.accessToken, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

