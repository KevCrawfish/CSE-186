const supertest = require('supertest');
const http = require('http');

const app = require('../src/app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll((done) => {
  server.close(done);
});

test('GET All', async () => {
  await request.get('/v0/mail')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
    });
});

test('GET Inbox', async () => {
  await request.get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
    });
});

const mail = {
  toName: 'Keanu Reeves',
  toEmail: 'johnwick@ucsc.edu',
  subject: 'You\'re breathtaking',
  content: 'Good luck passing 186 :)',
};

const badMail = {
  toEmail: 'johnwick@ucsc.edu',
  subject: 'You\'re breathtaking',
  content: 'Good luck passing 186 :)',
};

test('POST new', async () => {
  await request.post('/v0/mail/')
    .send(mail)
    .expect(201)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.id).toBeDefined();
      expect(data.body.fromName).toBeDefined();
      expect(data.body.fromEmail).toBeDefined();
      expect(data.body.received).toBeDefined();
      expect(data.body.toName).toEqual(mail.toName);
      expect(data.body.toEmail).toEqual(mail.toEmail);
      expect(data.body.subject).toEqual(mail.subject);
      expect(data.body.content).toEqual(mail.content);
    });
});

test('POST bad', async () => {
  await request.post('/v0/mail/')
    .send(badMail)
    .expect(400);
});

test('GET id', async () => {
  let id = 0;
  await request.get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      return id = data.body[0].mail[0].id;
    });
  await request.get('/v0/mail/' + id)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
    });
});

test('GET bad id', async () => {
  await request.get('/v0/mail/591b428e-1b99-4a56-b653-dab17210b3b')
    .expect(400);
});

test('GET unknown id', async () => {
  await request.get('/v0/mail/591b428e-1b99-4a56-b653-dab17210b3b3')
    .expect(404);
});

test('PUT regular', async () => {
  let id = 0;
  await request.get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      return id = data.body[0].mail[0].id;
    });
  await request.put(
    '/v0/mail/' + id + '?mailbox=trash')
    .expect(204);
});

test('PUT to sent', async () => {
  let id = 0;
  await request.get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      return id = data.body[0].mail[0].id;
    });
  await request.put(
    '/v0/mail/' + id + '?mailbox=sent')
    .expect(409);
});

test('PUT bad id', async () => {
  await request.put(
    '/v0/mail/591b428e-1b99-4a56-b653-dab17210b3b?mailbox=sent')
    .expect(400);
});

test('PUT id not found', async () => {
  await request.put(
    '/v0/mail/591b428e-1b99-4a56-b653-dab17210b3b3?mailbox=sent')
    .expect(404);
});

test('PUT new mailbox', async () => {
  let id = 0;
  await request.get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      return id = data.body[0].mail[0].id;
    });
  await request.put(
    '/v0/mail/' + id + '?mailbox=test')
    .expect(204);
});
