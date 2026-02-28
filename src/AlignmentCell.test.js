import { AlignmentCell } from './AlignmentCell';

describe('`class AlignmentCell`', () => {
  test('`constructor()`', () => {
    var cell = new AlignmentCell(9.68, 1, 0);

    expect(cell.score).toBe(9.68);

    expect(cell.deltaI).toBe(1);
    expect(cell.deltaJ).toBe(0);
  });
});
