import type { TextContent } from './TextContent';

import { align } from './align';

import { backtrack } from './backtrack';

/**
 * Finds complements to the motif in the sequnce.
 */
export function complementsSearch(motif: Iterable<TextContent> | string, sequence: Iterable<TextContent> | string, options?: Options): Iterable<Complement> {
  let cutoff = options?.cutoff ?? 1;

  let mismatchPenalty = options?.mismatchPenalty ?? -1;
  let gapPenalty = options?.gapPenalty ?? -1.5;

  let wobblePenalty = options?.wobblePenalty ?? -0.5;

  if (typeof motif == 'string') {
    motif = [...motif].map(c => ({ textContent: c }));
  }

  if (typeof sequence == 'string') {
    sequence = [...sequence].map(c => ({ textContent: c }));
  }

  // reverse motif when finding complements
  let matrix = align(
    [...motif].reverse(),
    [...sequence],
    { mismatchPenalty, gapPenalty, wobblePenalty, complements: true },
  );

  let complements = [];

  let motifLength = [...motif].length;
  let sequenceLength = [...sequence].length;

  let endI = motifLength;

  for (let endJ = 1; endJ <= sequenceLength; endJ++) {
    let endCell = matrix.get(endI, endJ);

    if (endCell.score / motifLength >= cutoff) {
      let { startJ } = backtrack(endI, endJ, matrix);

      complements.push({
        index: startJ - 1,
        position: startJ,
        length: endJ - startJ + 1,
      });
    }
  }

  return complements;
}

type Options = {
  readonly cutoff?: number;

  readonly mismatchPenalty?: number;

  readonly gapPenalty?: number;

  readonly wobblePenalty?: number;
};

type Complement = {
  /**
   * The zero-based index in the sequence where the complement starts.
   */
  readonly index: number;

  /**
   * The one-based position in the sequence where the complement starts.
   */
  readonly position: number;

  /**
   * The number of characters in the complement.
   */
  readonly length: number;
};
