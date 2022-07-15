const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../src/app');

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
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
      .expect(404);
});

test('GET All', async () => {
  await request.get('/v0/mail')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body[0].name).toBeDefined();
        expect(data.body[0].mail).toBeDefined();
        expect(data.body[0].mail[0].content).toBeUndefined();
      });
});

test('GET inbox', async () => {
  await request.get('/v0/mail?mailbox=inbox')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body[0].name).toEqual('inbox');
        expect(data.body[0].mail).toBeDefined();
        expect(data.body[0].mail[0].content).toBeUndefined();
      });
});

test('GET inbox and from', async () => {
  await request.get('/v0/mail?mailbox=inbox&from=e')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body[0].name).toEqual('inbox');
        expect(data.body[0].mail).toBeDefined();
        expect(data.body[0].mail[0].from.name ||
          data.body[0].mail[0].from.email).toMatch(/[e]/);
        expect(data.body[0].mail[0].content).toBeUndefined();
      });
});

test('GET from', async () => {
  await request.get('/v0/mail?from=john')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body[0].mail[0].from.name ||
          data.body[0].mail[0].from.email).toMatch(/[john]/);
        expect(data.body[0].mail[0].content).toBeUndefined();
      });
});

test('GET not found', async () => {
  await request.get('/v0/mail?from=sadfafdsfdsafds')
      .expect(404);
});

test('GET by id', async () => {
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
        expect(data.body.content).toBeDefined();
        expect(data.body.id).toBeDefined();
        expect(data.body.from).toBeDefined();
        expect(data.body.to).toBeDefined();
        expect(data.body.subject).toBeDefined();
        expect(data.body.sent).toBeDefined();
        expect(data.body.received).toBeDefined();
      });
});

test('GET bad id', async () => {
  await request.get('/v0/mail/' + 'lol')
      .expect(400);
});

test('GET id not found', async () => {
  await request.get('/v0/mail/' + '4e49f731-b6ab-4475-b41b-23ae19cd6fa2')
      .expect(404);
});

const mail = {
  to: {name: 'Keanu Reeves', email: 'johnwick@ucsc.edu'},
  subject: 'You\'re breathtaking',
  content: 'Good luck passing 186 :)',
};

const badMail = {
};

test('POST new', async () => {
  await request.post('/v0/mail/')
      .send(mail)
      .expect(201)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.from).toEqual({name: 'CSE186 Student',
          email: 'CSE186student@ucsc.edu'});
        expect(data.body.received).toBeDefined();
        expect(data.body.sent).toBeDefined();
        expect(data.body.to).toEqual(mail.to);
        expect(data.body.subject).toEqual(mail.subject);
        expect(data.body.content).toEqual(mail.content);
        expect(data.body.id).toBeDefined();
      });
});

test('POST bad', async () => {
  await request.post('/v0/mail/')
      .send(badMail)
      .expect(400);
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

test('PUT into sent', async () => {
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

test('PUT unknown id', async () => {
  await request.put(
      '/v0/mail/' +
      '4e49f731-b6ab-4475-b41b-23ae19cd6fa2' + '?mailbox=sent')
      .expect(404);
});

test('PUT bad id', async () => {
  await request.put(
      '/v0/mail/' +
      '23 is number one' + '?mailbox=sent')
      .expect(400);
});

test('GET sent after POST', async () => {
  let id = 0;
  await request.post('/v0/mail/')
      .send(mail)
      .expect(201)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.from).toEqual({name: 'CSE186 Student',
          email: 'CSE186student@ucsc.edu'});
        expect(data.body.received).toBeDefined();
        expect(data.body.sent).toBeDefined();
        expect(data.body.to).toEqual(mail.to);
        expect(data.body.subject).toEqual(mail.subject);
        expect(data.body.content).toEqual(mail.content);
        expect(data.body.id).toBeDefined();
        id = data.body.id;
      });
  await request.get('/v0/mail?mailbox=sent')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].from,
        ).toEqual({name: 'CSE186 Student',
          email: 'CSE186student@ucsc.edu'});
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].received,
        ).toBeDefined();
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].sent,
        ).toBeDefined();
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].to,
        ).toEqual(mail.to);
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].subject,
        ).toEqual(mail.subject);
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].id,
        ).toEqual(id);
      });
});

test('GET id after POST', async () => {
  let id = 0;
  await request.post('/v0/mail/')
      .send(mail)
      .expect(201)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.from).toEqual({name: 'CSE186 Student',
          email: 'CSE186student@ucsc.edu'});
        expect(data.body.received).toBeDefined();
        expect(data.body.sent).toBeDefined();
        expect(data.body.to).toEqual(mail.to);
        expect(data.body.subject).toEqual(mail.subject);
        expect(data.body.content).toEqual(mail.content);
        expect(data.body.id).toBeDefined();
        id = data.body.id;
      });
  await request.get('/v0/mail/' + id)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.from).toEqual({name: 'CSE186 Student',
          email: 'CSE186student@ucsc.edu'});
        expect(data.body.received).toBeDefined();
        expect(data.body.sent).toBeDefined();
        expect(data.body.to).toEqual(mail.to);
        expect(data.body.subject).toEqual(mail.subject);
        expect(data.body.content).toEqual(mail.content);
        expect(data.body.id).toEqual(id);
      });
});

test('GET Trash after PUT', async () => {
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
  await request.get('/v0/mail?mailbox=trash')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].id,
        ).toEqual(id);
      });
});

test('GET New Mailbox after PUT', async () => {
  let id = 0;
  await request.get('/v0/mail?mailbox=trash')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        return id = data.body[0].mail[0].id;
      });
  await request.put(
      '/v0/mail/' + id + '?mailbox=epic mail')
      .expect(204);
  await request.get('/v0/mail?mailbox=epic mail')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].id,
        ).toEqual(id);
      });
});

test('GET Inbox after PUT', async () => {
  let id = 0;
  await request.get('/v0/mail?mailbox=epic mail')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        return id = data.body[0].mail[0].id;
      });
  await request.put(
      '/v0/mail/' + id + '?mailbox=inbox')
      .expect(204);
  await request.get('/v0/mail?mailbox=inbox')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(
            data.body[0].mail[data.body[0].mail.length - 1].id,
        ).toEqual(id);
      });
});

test('GET empty mailbox', async () => {
  await request.get('/v0/mail?mailbox=epic mail')
      .expect(404);
});

