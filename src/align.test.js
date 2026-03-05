import { align } from './align';

import { AlignmentCell } from './AlignmentCell';

import { SequenceCharacter } from './SequenceCharacter';

test('`function align()`', () => {
  var options = {
    mismatchPenalty: -1,
    gapPenalty: -1.5,
    wobblePenalty: -0.5,
  };

  // empty sequences
  expect(() => align([], [], options));

  // smoke test
  for (var i = 0; i < 25; i++) {
    var verticalSequence = randomSequence(Math.ceil(20 * Math.random()));
    var horizontalSequence = randomSequence(Math.ceil(1000 * Math.random()));

    var matrix = align(verticalSequence, horizontalSequence, { ...options, complements: false });

    for (let i = 0; i <= verticalSequence.length; i++) {
      for (let j = 0; j <= horizontalSequence.length; j++) {
        expect(matrix.get(i, j)).toBeInstanceOf(AlignmentCell);
      }
    }
  }

  // smoke test
  for (var i = 0; i < 25; i++) {
    var verticalSequence = randomSequence(Math.ceil(20 * Math.random()));
    var horizontalSequence = randomSequence(Math.ceil(1000 * Math.random()));

    var matrix = align(verticalSequence, horizontalSequence, { ...options, complements: true });

    for (let i = 0; i <= verticalSequence.length; i++) {
      for (let j = 0; j <= horizontalSequence.length; j++) {
        expect(matrix.get(i, j)).toBeInstanceOf(AlignmentCell);
      }
    }
  }

  // vertical sequence longer than horizontal sequence
  var verticalSequence = randomSequence(100);
  var horizontalSequence = randomSequence(20);

  var matrix = align(verticalSequence, horizontalSequence, options);

  for (let i = 0; i <= verticalSequence.length; i++) {
    for (let j = 0; j <= horizontalSequence.length; j++) {
      expect(matrix.get(i, j)).toBeInstanceOf(AlignmentCell);
    }
  }

  var seq = randomSequence(20);

  // bases with empty text content
  seq[1] = { textContent: '' };
  seq[5] = { textContent: '' };

  expect(() => align(seq, randomSequence(100), options)).not.toThrow();
  expect(() => align(randomSequence(3), seq, options)).not.toThrow();

  expect(() => new SequenceCharacter('')).toThrow();

  var seq = randomSequence(10);

  // bases with text content containing more than one character
  seq[2] = { textContent: 'AG' };
  seq[9] = { textContent: 'asdf' };

  expect(() => align(seq, randomSequence(100), options)).not.toThrow();
  expect(() => align(randomSequence(5), seq, options)).not.toThrow();

  expect(() => new SequenceCharacter('AG')).toThrow();
});

function randomSequence(length) {
  return Array.from({ length }).map(() => ({ textContent: randomCharacter() }));
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
