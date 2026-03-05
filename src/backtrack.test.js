import { backtrack } from './backtrack';

import { align } from './align';

test('`function backtrack()`', () => {
  var options = {
    mismatchPenalty: -1,
    gapPenalty: -1.5,
    wobblePenalty: -0.5,
  };

  // empty sequences
  var matrix = align([], [], options);

  expect(typeof backtrack(0, 0, matrix).startJ).toBe('number');

  expect(() => backtrack(1, 1, matrix)).toThrow();
  expect(() => backtrack(1, 0, matrix)).toThrow();
  expect(() => backtrack(0, 1, matrix)).toThrow();

  // negative indices
  expect(() => backtrack(-1, 0, matrix)).toThrow();
  expect(() => backtrack(0, -1, matrix)).toThrow();

  // smoke test
  for (var i = 0; i < 25; i++) {
    var verticalSequence = randomSequence(Math.ceil(20 * Math.random()));
    var horizontalSequence = randomSequence(Math.ceil(1000 * Math.random()));

    var matrix = align(verticalSequence, horizontalSequence, { ...options, complements: false });

    for (var endI = 0; endI <= verticalSequence.length; endI++) {
      for (var endJ = 0; endJ <= horizontalSequence.length; endJ++) {
        expect(typeof backtrack(endI, endJ, matrix).startJ).toBe('number');
      }
    }
  }

  for (var i = 0; i < 25; i++) {
    var verticalSequence = randomSequence(Math.ceil(20 * Math.random()));
    var horizontalSequence = randomSequence(Math.ceil(1000 * Math.random()));

    var matrix = align(verticalSequence, horizontalSequence, { ...options, complements: true });

    for (var endI = 0; endI <= verticalSequence.length; endI++) {
      for (var endJ = 0; endJ <= horizontalSequence.length; endJ++) {
        expect(typeof backtrack(endI, endJ, matrix).startJ).toBe('number');
      }
    }
  }

  // vertical sequence is longer than horizontal sequence
  var verticalSequence = randomSequence(100);
  var horizontalSequence = randomSequence(20);

  var matrix = align(verticalSequence, horizontalSequence, options);

  for (var endI = 0; endI <= verticalSequence.length; endI++) {
    for (var endJ = 0; endJ <= horizontalSequence.length; endJ++) {
      expect(typeof backtrack(endI, endJ, matrix).startJ).toBe('number');
    }
  }
});

function randomSequence(length) {
  return Array.from({ length }).map(() => randomCharacter());
}

function randomCharacter() {
  return IUPAC_codes[Math.floor(IUPAC_codes.length * Math.random())];
}

const IUPAC_codes = [
  ...'AUGC',
  'T',
  ...'RYSWKMBDHVN',
  ...'.-',
];
