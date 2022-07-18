const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/dsafdhsafkjsd')
    .expect(404);
});

test('GET All not logged in', async () => {
  await request.get('/v0/mail?mailbox=inbox')
    .expect(401);
});

const login = {
  email: 'molly@slugmail.com',
  password: 'mollymember',
};

const badLogin = {
  email: 'string',
  password: 'string',
};

const badEmail = {
  email: 'molly@slugmail.com',
  password: 'string',
};

test('log in not authorized', async () => {
  await request.post('/v0/login')
    .send(badLogin)
    .expect(401);
});

test('log in good', async () => {
  await request.post('/v0/login')
    .send(login)
    .expect(200);
});

test('log in then get no token', async () => {
  await request.post('/v0/login')
    .send(login)
    .expect(200);
  await request.get('/v0/mail?mailbox=inbox')
    .expect(401);
});

test('log in then get', async () => {
  let token = '';
  await request.post('/v0/login')
    .send(login)
    .expect(200)
    .then((data) => {
      token = data.body.accessToken;
    });
  await request.get('/v0/mail?mailbox=inbox')
    .set('Authorization', 'Bearer ' + token)
    .expect(200);
});

test('log in bad token', async () => {
  let token = '';
  await request.post('/v0/login')
    .send(login)
    .expect(200)
    .then((data) => {
      token = data.body.accessToken;
    });
  await request.get('/v0/mail?mailbox=inbox')
    .set('Authorization', 'Bearer ' + token + '0')
    .expect(403);
});

test('log in then get from bad mailbox', async () => {
  let token = '';
  await request.post('/v0/login')
    .send(login)
    .expect(200)
    .then((data) => {
      token = data.body.accessToken;
    });
  await request.get('/v0/mail?mailbox=notinbox')
    .set('Authorization', 'Bearer ' + token)
    .expect(404);
});

test('log in bad email', async () => {
  await request.post('/v0/login')
    .send(badEmail)
    .expect(401);
});

test('log in then get', async () => {
  let token = '';
  await request.post('/v0/login')
    .send(login)
    .expect(200)
    .then((data) => {
      token = data.body.accessToken;
    });
  await request.get('/v0/mail')
    .set('Authorization', 'Bearer ' + token)
    .expect(200);
});
