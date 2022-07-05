import {waitFor, fireEvent, screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

test('Nothing', () => {
  render(<App />);
});

test('Button On Load', async () => {
  render(<App />);
  expect(screen.getByRole('button')).toBeDisabled();
});

test('Typing Basic', async () => {
  const user = new userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await userEvent.type(input, '12/01/1998');
  expect(input.value).toBe('12/01/1998');
});

test('Button Enabled', async () => {
  const user = new userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await userEvent.type(input, '12/01/1998');
  expect(screen.getByText('Set')).not.toBeDisabled();
});

test('Close But Needs Backslashes', async () => {
  const user = new userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await userEvent.type(input, '12-01-1998');
  expect(screen.getByText('Set')).toBeDisabled();
});

test('Display After Clicking Set', async () => {
  const user = new userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await userEvent.type(input, '12/01/1998');
  await userEvent.click(screen.getByText('Set'));
  expect(screen.getByText('December 1998')).toBeInTheDocument();
});
