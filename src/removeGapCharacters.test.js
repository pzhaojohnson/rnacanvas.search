import { removeGapCharacters } from './removeGapCharacters';

test('`function removeGapCharacters()`', () => {
  expect(removeGapCharacters('')).toBe('');

  expect(removeGapCharacters('.-')).toBe('');

  // no gap characters
  expect(removeGapCharacters('asdf')).toBe('asdf');

  expect(removeGapCharacters('a-sd.f')).toBe('asdf');

  // multiple of each gap character
  expect(removeGapCharacters('a..s-.-d---...f')).toBe('asdf');

  // gap characters at beginning and end
  expect(removeGapCharacters('.-asdf-.---')).toBe('asdf');

  // a single non-gap character
  expect(removeGapCharacters('.-.A--.')).toBe('A');
});
