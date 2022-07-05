import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

/**
 * Credit to https://github.com/testing-library/user-event
 * https://github.com/testing-library/react-testing-library
 */

test('Nothing', () => {
  render(<App />);
});

test('Init Display', async () => {
  render(<App />);
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  let month = months[date.getMonth()];
  month += ' ';
  month += date.getFullYear();
  expect(screen.getByText(month)).toBeInTheDocument();
});

test('Next Months', async () => {
  const user = userEvent.setup();
  render(<App />);
  const relative = Math.max(1, Math.floor(Math.random()*10));
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth()+relative);
  for (let i = 0; i < relative; i++) {
    await user.click(screen.getByLabelText('next'));
  }
  expect(screen.getAllByText('1')[0].id).toBe('d' + date.getDay());
});

test('Prev Months', async () => {
  const user = userEvent.setup();
  render(<App />);
  const relative = Math.max(1, Math.floor(Math.random()*10));
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth()-relative);
  for (let i = 0; i < relative; i++) {
    await user.click(screen.getByLabelText('prev'));
  }
  expect(screen.getAllByText('1')[0].id).toBe('d' + date.getDay());
});

test('pick d0', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('26')[0]);
  expect(screen.getAllByText('26')[0].id).toBe('today');
});

test('pick d1', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('27')[0]);
  expect(screen.getAllByText('27')[0].id).toBe('today');
});

test('pick d2', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('28')[0]);
  expect(screen.getAllByText('28')[0].id).toBe('today');
});

test('pick d3', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('29')[0]);
  expect(screen.getAllByText('29')[1].id).toBe('today');
});

test('pick d4', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('30')[0]);
  expect(screen.getAllByText('30')[1].id).toBe('today');
});

test('pick d5', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('1')[0]);
  expect(screen.getAllByText('1')[0].id).toBe('today');
});

test('pick d6', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('2')[0]);
  expect(screen.getAllByText('2')[0].id).toBe('today');
});

test('pick d7', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('3')[0]);
  expect(screen.getAllByText('3')[0].id).toBe('today');
});

test('pick d8', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('4')[0]);
  expect(screen.getAllByText('4')[0].id).toBe('today');
});

test('pick d9', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('5')[0]);
  expect(screen.getAllByText('5')[0].id).toBe('today');
});

test('pick d10', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('6')[0]);
  expect(screen.getAllByText('6')[0].id).toBe('today');
});

test('pick d11', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('7')[0]);
  expect(screen.getAllByText('7')[0].id).toBe('today');
});

test('pick d12', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('8')[0]);
  expect(screen.getAllByText('8')[0].id).toBe('today');
});

test('pick d13', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('9')[0]);
  expect(screen.getAllByText('9')[0].id).toBe('today');
});

test('pick d14', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('10')[0]);
  expect(screen.getAllByText('10')[0].id).toBe('today');
});

test('pick d15', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('11')[0]);
  expect(screen.getAllByText('11')[0].id).toBe('today');
});

test('pick d16', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('12')[0]);
  expect(screen.getAllByText('12')[0].id).toBe('today');
});

test('pick d17', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('13')[0]);
  expect(screen.getAllByText('13')[0].id).toBe('today');
});

test('pick d18', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('14')[0]);
  expect(screen.getAllByText('14')[0].id).toBe('today');
});

test('pick d19', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('15')[0]);
  expect(screen.getAllByText('15')[0].id).toBe('today');
});

test('pick d20', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('16')[0]);
  expect(screen.getAllByText('16')[0].id).toBe('today');
});

test('pick d21', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('17')[0]);
  expect(screen.getAllByText('17')[0].id).toBe('today');
});

test('pick d22', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('18')[0]);
  expect(screen.getAllByText('18')[0].id).toBe('today');
});

test('pick d23', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('19')[0]);
  expect(screen.getAllByText('19')[0].id).toBe('today');
});

test('pick d24', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('20')[0]);
  expect(screen.getAllByText('20')[0].id).toBe('today');
});

test('pick d25', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('21')[0]);
  expect(screen.getAllByText('21')[0].id).toBe('today');
});

test('pick d26', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('22')[0]);
  expect(screen.getAllByText('22')[0].id).toBe('today');
});

test('pick d27', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('23')[0]);
  expect(screen.getAllByText('23')[0].id).toBe('today');
});

test('pick d28', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('24')[0]);
  expect(screen.getAllByText('24')[0].id).toBe('today');
});

test('pick d29', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('25')[0]);
  expect(screen.getAllByText('25')[0].id).toBe('today');
});

test('pick d30', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('26')[1]);
  expect(screen.getAllByText('26')[1].id).toBe('today');
});

test('pick d31', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('27')[1]);
  expect(screen.getAllByText('27')[1].id).toBe('today');
});

test('pick d32', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('28')[1]);
  expect(screen.getAllByText('28')[1].id).toBe('today');
});

test('pick d33', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('29')[1]);
  expect(screen.getAllByText('29')[1].id).toBe('today');
});

test('pick d34', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('30')[1]);
  expect(screen.getAllByText('30')[1].id).toBe('today');
});

test('pick d35', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('31')[0]);
  expect(screen.getAllByText('31')[0].id).toBe('today');
});

test('pick d36', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('1')[1]);
  expect(screen.getAllByText('1')[0].id).toBe('today');
});

test('pick d37', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('2')[1]);
  expect(screen.getAllByText('2')[0].id).toBe('today');
});

test('pick d38', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('3')[1]);
  expect(screen.getAllByText('3')[0].id).toBe('today');
});

test('pick d39', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('4')[1]);
  expect(screen.getAllByText('4')[0].id).toBe('today');
});

test('pick d40', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('5')[1]);
  expect(screen.getAllByText('5')[0].id).toBe('today');
});

test('pick d41', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('6')[1]);
  expect(screen.getAllByText('6')[0].id).toBe('today');
});

test('pick display', async () => {
  const user = userEvent.setup();
  render(<App />);
  const date = new Date();
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '7/5/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getByLabelText('prev'));
  await user.click(screen.getByText('June 2022'));
  expect(screen.getAllByText(date.getDate())[0].id).toBe('today');
});

test('pick d36 not gray', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '10/1/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('31')[0]);
  expect(screen.getAllByText('31')[0].id).toBe('today');
});

test('pick d1 not gray', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '5/1/2022');
  await user.click(screen.getByText('Set'));
  await user.click(screen.getAllByText('1')[0]);
  expect(screen.getAllByText('1')[0].id).toBe('today');
});

test('pick d28 not gray', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText('MM/DD/YYYY');
  await user.type(input, '2/1/2015');
  await user.click(screen.getByText('Set'));
  expect(screen.getAllByText('1')[1].className).toBe('grey');
});
