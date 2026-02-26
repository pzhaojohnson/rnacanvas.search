import { Motif } from './Motif';

describe('`class Motif`', () => {
  test('`constructor()`', () => {
    // empty motif
    var emptyMotif = new Motif('');
    expect(emptyMotif.toString()).toBe('');

    // single character
    var G = new Motif('G');
    expect(G.toString()).toBe('G');

    // multiple characters
    var CCS = new Motif('CCS');
    expect(CCS.toString()).toBe('CCS');
  });

  test('`toString()`', () => {
    var motif = new Motif('CUGCCA');

    expect(motif.toString()).toBe('CUGCCA');
  });
});
