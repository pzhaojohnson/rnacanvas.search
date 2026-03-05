import type { TextContent } from './TextContent';

import { align } from './align';

import { backtrack } from './backtrack';

/**
 * Finds instances of the motif in the sequence.
 */
export function motifSearch(motif: Iterable<TextContent> | string, sequence: Iterable<TextContent> | string, options?: Options): Iterable<Match> {
  let cutoff = options?.cutoff ?? 1;

  let mismatchPenalty = options?.mismatchPenalty ?? -1;
  let gapPenalty = options?.gapPenalty ?? -1.5;

  if (typeof motif == 'string') {
    motif = [...motif].map(c => ({ textContent: c }));
  }

  if (typeof sequence == 'string') {
    sequence = [...sequence].map(c => ({ textContent: c }));
  }

  let motifArray = [...motif];
  let sequenceArray = [...sequence];

  let matrix = align(
    motifArray,
    sequenceArray,
    { mismatchPenalty, gapPenalty },
  );

  let matches: Match[] = [];

  let motifLength = [...motif].length;
  let sequenceLength = [...sequence].length;

  let endI = motifLength;

  for (let endJ = 1; endJ <= sequenceLength; endJ++) {
    let endCell = matrix.get(endI, endJ);

    if (endCell.score / motifLength >= cutoff) {
      let { startJ } = backtrack(endI, endJ, matrix);

      matches.push({
        index: startJ - 1,
        position: startJ,
        length: endJ - startJ + 1,
      });
    }
  }

  return matches;
}

type Options = {
  readonly cutoff?: number;

  readonly mismatchPenalty?: number;

  readonly gapPenalty?: number;
};

type Match = {
  /**
   * The zero-based index in the sequence where the match starts.
   */
  readonly index: number;

  /**
   * The one-based position in the sequence where the match starts.
   */
  readonly position: number;

  /**
   * The length of the match in terms of number of characters.
   */
  readonly length: number;
};
