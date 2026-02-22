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

  test('`complements()`', () => {
    var A = new SequenceCharacter('A');

    // complementing string characters
    expect(A.complements('U')).toBe(true);
    expect(A.complements('C')).toBe(false);

    var g = new SequenceCharacter('g');

    // uppercase and lowercase
    expect(A.complements('u')).toBe(true);
    expect(g.complements('C')).toBe(true);

    // U and T
    var U = new SequenceCharacter('U');
    var t = new SequenceCharacter('t');

    expect(U.complements('A')).toBe(true);
    expect(U.complements('g')).toBe(true);
    expect(U.complements('T')).toBe(false);

    expect(t.complements('a')).toBe(true);
    expect(t.complements('G')).toBe(true);
    expect(t.complements('c')).toBe(false);

    // complementing sequence character instances
    expect(A.complements(new SequenceCharacter('U'))).toBe(true);
    expect(A.complements(new SequenceCharacter('G'))).toBe(false);

    var N = new SequenceCharacter('N');

    // the any character complements everything (except for gap characters)
    expect(N.complements('A')).toBe(true);
    expect(N.complements('p')).toBe(true);
    expect(N.complements('.')).toBe(false);
    expect(N.complements('-')).toBe(false);

    // empty string
    expect(N.complements('')).toBe(false);

    // not a single character
    expect(N.complements('AG')).toBe(false);

    var period = new SequenceCharacter('.');
    var dash = new SequenceCharacter('-');

    // gap characters can complement gap characters
    expect(period.complements('.')).toBe(true);
    expect(period.complements('-')).toBe(true);
    expect(dash.complements('.')).toBe(true);
    expect(dash.complements('-')).toBe(true);

    // gap characters don't complement anything else (including N)
    expect(period.complements('a')).toBe(false);
    expect(period.complements('N')).toBe(false);
    expect(dash.complements('G')).toBe(false);
    expect(dash.complements('n')).toBe(false);
  });
});
