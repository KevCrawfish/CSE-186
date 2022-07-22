const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();
const app = require('../../backend/src/app');

let backend;
let frontend;
let browser;
let page;

beforeAll(() => {
  backend = http.createServer(app);
  backend.listen(3011, () => {
    console.log('Backend Running at http://localhost:3011');
  });
  frontend = http.createServer(
    express()
      .use('/v0', createProxyMiddleware({ 
        target: 'http://localhost:3011/',
        changeOrigin: true}))
      .use('/static', express.static(
        path.join(__dirname, '..', '..', 'frontend', 'build', 'static')))
      .get('*', function(req, res) {
        res.sendFile('index.html', 
            {root:  path.join(__dirname, '..', '..', 'frontend', 'build')})
      })
  );
  frontend.listen(3020, () => {
    console.log('Frontend Running at http://localhost:3020');
  });
});

afterAll((done) => {
  backend.close(() => { 
    frontend.close(done);
  });
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--headless',
    ],
  });
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});

test('input text into email field and login', async () => {
  await page.goto('http://localhost:3020');
  await page.type('input[name=email]', 'molly@slugmail.com');
  await page.type('input[name=password]', 'mollymember');
  await page.click('input[type=submit]');
  await page.waitForNavigation();
});

test('input text into email field no login', async () => {
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  })
  await page.goto('http://localhost:3020');
  await page.type('input[name=email]', 'bademail@email.com');
  await page.type('input[name=password]', 'bademail');
  await page.click('input[type=submit]');
  const prop = await page.$eval('#welcome', el => el.textContent);
  expect(prop).toBe('Login');
});

