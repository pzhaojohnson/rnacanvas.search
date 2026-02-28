import { isWobblePair } from './isWobblePair';

import { SequenceCharacter } from './SequenceCharacter';

test('`function isWobblePair()`', () => {
  expect(isWobblePair('G', 'U')).toBe(true);
  expect(isWobblePair('G', 'T')).toBe(true);

  expect(isWobblePair('A', 'U')).toBe(false);
  expect(isWobblePair('G', 'C')).toBe(false);

  // order shouldn't matter
  expect(isWobblePair('U', 'G')).toBe(true);
  expect(isWobblePair('T', 'G')).toBe(true);

  // case shouldn't matter
  expect(isWobblePair('g', 'u')).toBe(true);
  expect(isWobblePair('G', 't')).toBe(true);
  expect(isWobblePair('a', 'U')).toBe(false);

  // with sequence character instances
  expect(isWobblePair(new SequenceCharacter('G'), new SequenceCharacter('U'))).toBe(true);
  expect(isWobblePair(new SequenceCharacter('A'), new SequenceCharacter('U'))).toBe(false);

  // empty strings
  expect(isWobblePair('', '')).toBe(false);
  expect(isWobblePair('G', '')).toBe(false);
  expect(isWobblePair('', 'U')).toBe(false);

  // strings containing more than one character
  expect(isWobblePair('AG', 'UC')).toBe(false);
  expect(isWobblePair('G', 'UC')).toBe(false);
  expect(isWobblePair('AG', 'U')).toBe(false);
});
