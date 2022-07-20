import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {MemoryRouter, Routes, Route} from 'react-router-dom';

// import App from '../App';
import Login from '../Login';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const URL = 'http://localhost:3010/v0/login';
const server = setupServer(
  rest.post(URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          'name': 'string',
          'accessToken': 'string',
        },
      ));
  }),
);

/**
 */
test('Login Click Sign In', async () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByText('Sign In'));
});

/**
 */
test('Login Enter Text', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
    </MemoryRouter>,
  );
  const input = screen.getByPlaceholderText('Email address');
  await user.type(input, 'jimothy');
  screen.getByLabelText('yeah');
});

/**
 */
test('Login bad sign in', async () => {
  const user = userEvent.setup();
  server.use(
    rest.post(URL, (req, res, ctx) => {
      return res(
        ctx.status(401),
      );
    }),
  );
  render(
    <MemoryRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
    </MemoryRouter>,
  );
  window.alert = jest.fn();
  let input = screen.getByPlaceholderText('Email address');
  await user.type(input, 'user');
  input = screen.getByPlaceholderText('Password');
  await user.type(input, 'pass');
  user.click(screen.getByText('Sign In'));
  await waitFor(() => {
    expect(window.alert).toBeCalled();
  });
});
