import type { TextContent } from './TextContent';

import { AlignmentMatrix } from './AlignmentMatrix';

import { AlignmentCell } from './AlignmentCell';

import { SequenceCharacter } from './SequenceCharacter';

import { isWobblePair } from './isWobblePair';

/**
 * Aligns the vertical sequence to the horizontal sequence.
 *
 * Algorithm used is a hybrid of global and local alignment.
 *
 * (The vertical sequence is aligned in a global manner to the horizontal sequence,
 * though alignments may begin anywhere within the horizontal sequence.)
 *
 * It's generally expected that the vertical sequence is not as long as the horizontal sequence
 * (e.g., is a motif).
 */
export function align(verticalSequence: TextContent[], horizontalSequence: TextContent[], options: AlignmentOptions): AlignmentMatrix {
  let { mismatchPenalty, gapPenalty, wobblePenalty } = options;

  if (typeof wobblePenalty != 'number') {
    wobblePenalty = 0;
  }

  let matrix = new AlignmentMatrix();

  // set the top-left corner to start
  matrix.set(0, 0, new AlignmentCell(0, 0, 0));

  // permit alignments to begin anywhere within the horizontal sequence
  for (let j = 1; j <= horizontalSequence.length; j++) {
    matrix.set(0, j, new AlignmentCell(0, 0, 0));
  }

  // penalize "skipping" leading characters in the vertical sequence
  for (let i = 1; i <= verticalSequence.length; i++) {
    let score = matrix.get(i - 1, 0).score + gapPenalty;

    matrix.set(i, 0, new AlignmentCell(score, 1, 0));
  }

  for (let i = 1; i <= verticalSequence.length; i++) {
    for (let j = 1; j <= horizontalSequence.length; j++) {
      let s1 = verticalSequence[i - 1].textContent;
      let s2 = horizontalSequence[j - 1].textContent;

      let c1: SequenceCharacter | undefined = s1.length == 1 ? new SequenceCharacter(s1) : undefined;

      let cells = [
        [1, 1],
        [1, 0],
        [0, 1],
      ]
        .map(([deltaI, deltaJ]) => {
          let score = matrix.get(i - deltaI, j - deltaJ).score;

          score += deltaI == 0 || deltaJ == 0 ? gapPenalty : 0;

          if (options.complements) {
            score += c1?.complements(s2) ? 1 : mismatchPenalty;
          } else {
            score += c1?.matches(s2) ? 1 : mismatchPenalty;
          }

          if (options.complements && isWobblePair(s1, s2)) {
            score += wobblePenalty;
          }

          return new AlignmentCell(score, deltaI, deltaJ);
        });

      // sort in descending order by score
      cells.sort((cell1, cell2) => cell2.score - cell1.score);

      matrix.set(i, j, cells[0]);
    }
  }

  return matrix;
}

type AlignmentOptions = {
  readonly mismatchPenalty: number;

  readonly gapPenalty: number;

  readonly wobblePenalty?: number;

  readonly complements?: boolean;
};
