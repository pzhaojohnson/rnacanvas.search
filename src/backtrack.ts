import type { AlignmentMatrix } from './AlignmentMatrix';

/**
 * Returns the alignment ending at the specified I and J indices in the alignment matrix.
 */
export function backtrack(endI: number, endJ: number, matrix: AlignmentMatrix) {
  let i = endI;
  let j = endJ;

  // the most recent changes to the I and J indices
  let deltaI = 0;
  let deltaJ = 0;

  let cell = matrix.get(i, j);

  while (cell.deltaI > 0 || cell.deltaJ > 0) {
    if (cell.deltaI < 0) {
      throw new Error('Cannot backtrack down in an alignment matrix.');
    } else if (cell.deltaJ < 0) {
      throw new Error('Cannot backtrack right in an alignment matrix.');
    }

    i -= cell.deltaI;
    j -= cell.deltaJ;

    deltaI = cell.deltaI;
    deltaJ = cell.deltaJ;

    cell = matrix.get(i, j);
  }

  return {
    /**
     * Starting J index.
     */
    startJ: j + deltaJ,
  };
}
