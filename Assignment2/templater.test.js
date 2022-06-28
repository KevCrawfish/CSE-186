const Templater = require('./templater');

/** */
test('Undefined', () => {
  const t = new Templater(undefined);
  expect(t.apply({})).toBe(undefined);
});

/** */
test('Single Tag', () => {
  const t = new Templater('Hello {{tag}}');
  expect(t.apply({tag: 'World'})).toBe('Hello World');
});

/** */
test('Multi Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little lamb');
});

/** */
test('Missing Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

/** */
test('Scrambled Tag', () => {
  const t = new Templater('{{Elizabeth}} had a {{tiny}} {{sheep}}');
  expect(t.apply({tiny: 'little', sheep: 'lamb', Elizabeth: 'Mary'}))
      .toBe('Mary had a little lamb');
});

/** */
test('Strict Tag Error', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had', lamb: 'lamb'}, true))
      .toThrow();
});

/** */
test('Strict Tag No Error', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}, true))
      .toBe('Mary had a little lamb');
});

/** */
test('Space Inside Tag', () => {
  const t = new Templater('Mary {{had }} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary a little lamb');
});

/** */
test('Double Space Seperated Tag', () => {
  const t = new Templater('Mary {{ had }} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary a little lamb');
});

/** */
test('No Spaces', () => {
  const t = new Templater('Mary {{had}}{{little}}');
  expect(t.apply({had: 'had', little: 'little'}))
      .toBe('Mary hadlittle');
});

/** */
test('Repeating Tags', () => {
  const t = new Templater('Mary {{had}} {{had}}');
  expect(t.apply({had: 'had', had: 'had'}))
      .toBe('Mary had had');
});

/** */
test('Misc Char: Middle', () => {
  const t = new Templater('Mary {{had}}-{{little}}');
  expect(t.apply({had: 'had', little: 'little'}))
      .toBe('Mary had-little');
});

/** */
test('Undefined Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({'': ''}))
      .toBe('Mary a');
});

/** */
test('No Tags', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({}))
      .toBe('Mary a');
});

/** */
test('No Spaces and Missing Tag', () => {
  const t = new Templater('Mary {{had}}{{little}}');
  expect(t.apply({little: 'little'}))
      .toBe('Mary little');
});

