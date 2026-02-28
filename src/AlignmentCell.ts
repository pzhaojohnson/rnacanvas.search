/**
 * A cell in an alignment matrix.
 */
export class AlignmentCell {
  readonly score;

  /**
   * The change in I index to get to this cell (from the previous cell).
   */
  readonly deltaI;

  /**
   * The change in J index to get to this cell (from the previous cell).
   */
  readonly deltaJ;

  constructor(score: number, deltaI: number, deltaJ: number) {
    this.score = score;

    this.deltaI = deltaI;
    this.deltaJ = deltaJ;
  }
}
