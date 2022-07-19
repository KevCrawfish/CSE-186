import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';
import Home from '../Home';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null)
    },
    writable: true
  });
});

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
