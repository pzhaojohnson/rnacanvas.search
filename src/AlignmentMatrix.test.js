import { AlignmentMatrix } from './AlignmentMatrix';

import { AlignmentCell } from './AlignmentCell';

describe('`class AlignmentMatrix`', () => {
  test('`get()`', () => {
    var matrix = new AlignmentMatrix();

    // matrix is empty
    expect(() => matrix.get(0, 0)).toThrow();

    matrix.set(0, 0, new AlignmentCell(7.5, 1, 0));
    expect(matrix.get(0, 0).score).toBe(7.5);

    // row is uninitialized
    expect(() => matrix.get(5, 9)).toThrow();

    matrix.set(5, 9, new AlignmentCell(10.1, 0, 1));
    expect(matrix.get(5, 9).score).toBe(10.1);

    // columns are uninitialized
    expect(() => matrix.get(5, 7)).toThrow();
    expect(() => matrix.get(5, 19)).toThrow();

    var matrix = new AlignmentMatrix();

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        matrix.set(i, j, new AlignmentCell(10 * Math.random(), 1, 1));
      }
    }

    expect(() => matrix.get(1, 2)).not.toThrow();

    // negative I index
    expect(() => matrix.get(-1, 2)).toThrow();

    // negative J index
    expect(() => matrix.get(1, -1)).toThrow();
  });

  test('`set()`', () => {
    var matrix = new AlignmentMatrix();

    // setting positions in uninitialized rows
    matrix.set(0, 0, new AlignmentCell(5.2, 1, 0));
    matrix.set(5, 10, new AlignmentCell(-2.9, 0, 0));

    expect(matrix.get(0, 0).score).toBe(5.2);
    expect(matrix.get(5, 10).score).toBe(-2.9);

    // setting a position in an uninitialized column in an initialized row
    matrix.set(5, 15, new AlignmentCell(12.8, 0, 1));
    expect(matrix.get(5, 15).score).toBe(12.8);

    // resetting an already assigned position
    matrix.set(5, 10, new AlignmentCell(8.3, 1, 0));
    expect(matrix.get(5, 10).score).toBe(8.3);

    // negative I index
    expect(() => matrix.set(-1, 0, new AlignmentCell(1, 1, 1))).toThrow();

    // negative J index
    expect(() => matrix.set(0, -1, new AlignmentCell(1, 1, 1))).toThrow();
  });
});
