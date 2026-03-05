import { removeWhitespace } from './removeWhitespace';

test('`function removeWhitespace()`', () => {
  // empty string
  expect(removeWhitespace('')).toBe('');

  // all whitespace
  expect(removeWhitespace('  \t\t \n\r \r\n \n\n \t ')).toBe('');

  // a single character
  expect(removeWhitespace('A')).toBe('A');
  expect(removeWhitespace(' ')).toBe('');

  // a mixture of whitespace and non-whitespace characters
  expect(removeWhitespace('Agc ug  aU\t \n \r\nGCU \r\nAGCG\r\nG\tCU')).toBe('AgcugaUGCUAGCGGCU');
});
