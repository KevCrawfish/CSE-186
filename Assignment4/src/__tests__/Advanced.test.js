import {render} from '@testing-library/react';
import App from '../App';

test('Nothing', () => {
  render(<App />); 
});

test('Init Display', async () => {
  render(<App />); 
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  expect(document.getElementById('display').textContent).toBe(months[date.getMonth()] + ' ' + date.getFullYear());
});

test('Init Date', async () => {
  render(<App />); 
  const date = new Date();
  expect(document.getElementById('today').textContent).toBe(date.getDate().toString());
});

