import type { SequenceCharacter } from './SequenceCharacter';

/**
 * Returns true if the two characters form a G:U or G:T pair.
 *
 * Returns false for empty strings and strings containing more than one character.
 */
export function isWobblePair(c1: SequenceCharacter | string, c2: SequenceCharacter | string): boolean {
  c1 = stringify(c1);
  c2 = stringify(c2);

  if (c1.length != 1 || c2.length != 1) {
    return false;
  }

  c1 = c1.toUpperCase();
  c2 = c2.toUpperCase();

  let UT = [...'UT'];

  return (
    (c1 === 'G' && UT.includes(c2))
    || (UT.includes(c1) && c2 == 'G')
  );
}

function stringify(c: SequenceCharacter | string): string {
  return typeof c != 'string' ? c.toString() : c;
}
