import { AlignmentCell } from './AlignmentCell';

export class AlignmentMatrix {
  readonly #rows: AlignmentCell[][] = [];

  get(i: number, j: number): AlignmentCell | never {
    if (i < 0) {
      throw new Error('I index cannot be negative.');
    } else if (j < 0) {
      throw new Error('J index cannot be negative.');
    }

    let row: AlignmentCell[] | undefined = this.#rows[i];

    if (!row) {
      throw new Error(`Indices (${i},${j}) have not been assigned a cell.`);
    }

    let cell: AlignmentCell | undefined = row[j];

    if (!cell) {
      throw new Error(`Indices (${i},${j}) have not been assigned a cell.`);
    }

    return cell;
  }

  set(i: number, j: number, cell: AlignmentCell): void {
    if (i < 0) {
      throw new Error('I index cannot be negative.');
    } else if (j < 0) {
      throw new Error('J index cannot be negative.');
    }

    if (!this.#rows[i]) {
      this.#rows[i] = [];
    }

    this.#rows[i][j] = cell;
  }
}
