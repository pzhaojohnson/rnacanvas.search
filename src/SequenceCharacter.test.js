import { SequenceCharacter } from './SequenceCharacter';

describe('`class SequenceCharacter`', () => {
  test('`constructor()`', () => {
    var c = new SequenceCharacter('g');
    expect(c.toString()).toBe('g');

    // empty string
    expect(() => new SequenceCharacter('')).toThrow();

    // multiple characters
    expect(() => new SequenceCharacter('AU')).toThrow();
    expect(() => new SequenceCharacter('asdf')).toThrow();

    // a whitespace character
    expect(() => new SequenceCharacter(' ')).not.toThrow();
  });

  test('`toString()`', () => {
    var c = new SequenceCharacter('z');
    expect(c.toString()).toBe('z');
  });

  test('`matches()`', () => {
    var A = new SequenceCharacter('A');

    // matching string characters
    expect(A.matches('A')).toBe(true);
    expect(A.matches('G')).toBe(false);

    var g = new SequenceCharacter('g');

    // matching uppercase and lowercase
    expect(A.matches('a')).toBe(true);
    expect(g.matches('G')).toBe(true);

    var U = new SequenceCharacter('U');
    var t = new SequenceCharacter('t');

    // U and T
    expect(U.matches('t')).toBe(true);
    expect(t.matches('U')).toBe(true);

    // matching sequence character instances
    expect(A.matches(new SequenceCharacter('A'))).toBe(true);
    expect(A.matches(new SequenceCharacter('2'))).toBe(false);

    var N = new SequenceCharacter('N');
    var n = new SequenceCharacter('n');

    // the any character
    expect(N.matches('a')).toBe(true);
    expect(N.matches('2')).toBe(true);
    expect(n.matches('H')).toBe(true);
    expect(n.matches('z')).toBe(true);
    expect(n.matches('N')).toBe(true);

    // empty string
    expect(N.matches('')).toBe(false);

    // not a single character
    expect(N.matches('AG')).toBe(false);

    // some special IUPAC characters
    var R = new SequenceCharacter('R');
    var d = new SequenceCharacter('d');

    expect(R.matches('A')).toBe(true);
    expect(R.matches('g')).toBe(true);
    expect(R.matches('C')).toBe(false);
    expect(R.matches('u')).toBe(false);
    expect(R.matches('T')).toBe(false);

    expect(d.matches('A')).toBe(true);
    expect(d.matches('g')).toBe(true);
    expect(d.matches('u')).toBe(true);
    expect(d.matches('T')).toBe(true);
    expect(d.matches('c')).toBe(false);

    // D includes R
    expect(d.matches('R')).toBe(true);
    expect(d.matches('Y')).toBe(false);

    // some non-IUPAC characters
    var j = new SequenceCharacter('j');
    var P = new SequenceCharacter('P');

    expect(j.matches('j')).toBe(true);
    expect(j.matches('J')).toBe(true);
    expect(j.matches('i')).toBe(false);

    expect(P.matches('P')).toBe(true);
    expect(P.matches('p')).toBe(true);
    expect(P.matches('B')).toBe(false);
  });
});
