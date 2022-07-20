import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {setupServer} from 'msw/node';
import {rest} from 'msw';

import App from '../App';
import Home from '../Home';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC' +
'J9.eyJlbWFpbCI6Im1vbGx5QHNsdWdtYWlsLmNvbSIsImlhdCI6MT' +
'Y1ODI2MzAxMiwiZXhwIjoxNjU4MjY0ODEyfQ.-LwaJl7rOn7M-cd1b' +
'TvLGZf9L2aIwee6aIqfqLuhs-g';

const URL = 'http://localhost:3010/v0/mail';
const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      ctx.json([{
        mail:
        {
          'to': {
            'name': 'string',
            'email': 'string',
          },
          'from': {
            'name': 'Jimothy',
            'email': 'string',
          },
          'subject': 'string',
          'content': 'string',
          'received': 'string',
          'sent': 'string',
          'id': '25235245432',
        },
      }]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 */
test('App Renders', async () => {
  render(<App />);
});

/**
 */
test('Home Renders', async () => {
  render(<Home />);
});

/**
 */
test('Fetch from home', async () => {
  window.localStorage.setItem('user', JSON.stringify({'name': 'Molly Member',
    'accessToken': 'not a real accessToken'}));
  render(<Home />);
  await waitFor(() =>{
    screen.getByLabelText('Jimothy');
  });
});

/**
 */
test('Fetch bad response', async () => {
  window.localStorage.setItem('user', JSON.stringify({'name': 'Molly Member',
    'accessToken': 'not a real accessToken'}));
  server.use(
    rest.get(URL, (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
  render(<Home />);
  await waitFor(() => {
    screen.getByText('ERROR', {exact: false});
  });
});

/**
 */
test('Home Renders with null value', async () => {
  window.localStorage.setItem('user', 'null');
  render(<Home />);
});
