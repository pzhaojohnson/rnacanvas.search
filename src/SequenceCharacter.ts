/**
 * A character in a sequence.
 */
export class SequenceCharacter {
  readonly #character;

  constructor(character: string) {
    if (character.length == 0) {
      throw new Error('Character cannot be an empty string.');
    } else if (character.length > 1) {
      throw new Error('Character must be a single character.');
    }

    this.#character = character;
  }

  toString(): string {
    return this.#character;
  }

  matches(otherCharacter: SequenceCharacter | string): boolean {
    if (typeof otherCharacter != 'string') {
      otherCharacter = otherCharacter.toString();
    }

    if (otherCharacter.length != 1) {
      return false;
    }

    let character = this.#character.toUpperCase();

    otherCharacter = otherCharacter.toUpperCase();

    if (character === 'N' || otherCharacter === 'N') {
      return true;
    }

    if (character in matches) {
      return matches[character]?.includes(otherCharacter) ?? false;
    } else {
      return character === otherCharacter;
    }
  }

  complements(otherCharacter: SequenceCharacter | string): boolean {
    if (typeof otherCharacter != 'string') {
      otherCharacter = otherCharacter.toString();
    }

    if (otherCharacter.length != 1) {
      return false;
    }

    let character = this.#character.toUpperCase();

    otherCharacter = otherCharacter.toUpperCase();

    let gapCharacters = [...'.-'];

    if (gapCharacters.includes(character) && gapCharacters.includes(otherCharacter)) {
      return true;
    } else if (gapCharacters.includes(character) || gapCharacters.includes((otherCharacter))) {
      return false;
    }

    if (character === 'N' && !gapCharacters.includes(otherCharacter)) {
      return true;
    } else if (otherCharacter === 'N' && !gapCharacters.includes(character)) {
      return true;
    }

    if (character in complements) {
      return complements[character]?.includes(otherCharacter) ?? false;
    } else {
      return false;
    }
  }
}

/**
 * IUPAC nucleic acid codes.
 */
const matches: { [character: string]: string[] | undefined } = {
  'A': [...'A'],
  'C': [...'C'],
  'G': [...'G'],
  'U': [...'UT'],
  'T': [...'TU'],
  'R': [...'AG'],
  'Y': [...'CUT'],
  'S': [...'GC'],
  'W': [...'AUT'],
  'K': [...'GUT'],
  'M': [...'AC'],
  'B': [...'CGUTYSK'],
  'D': [...'AGUTRWK'],
  'H': [...'ACUTYWM'],
  'V': [...'ACGRSM'],
  '.': [...'.-'],
  '-': [...'-.'],
};

const complements: { [character: string]: string[] | undefined } = {
  'A': [...'UT'],
  'C': [...'G'],
  'G': [...'CUT'],
  'U': [...'AG'],
  'T': [...'AG'],
};
