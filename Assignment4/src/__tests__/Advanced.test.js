import {waitFor, fireEvent, screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

test('Nothing', () => {
  render(<App />); 
});

test('Init Display', async () => {
  render(<App />); 
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  expect(screen.getByText('July 2022')).toBeInTheDocument();
});

test('Init Date', async () => {
  render(<App />); 
  const date = new Date();
  expect(screen.getAllByText(date.getDate())[0].id).toBe('today');
});

