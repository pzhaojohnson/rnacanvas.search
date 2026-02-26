import { Motif } from './Motif';

describe('`class Motif`', () => {
  test('`constructor()`', () => {
    // empty motif
    var motif = new Motif('');
    expect(motif.toString()).toBe('');

    // single character
    var motif = new Motif('G');
    expect(motif.toString()).toBe('G');

    // multiple characters
    var motif = new Motif('CCS');
    expect(motif.toString()).toBe('CCS');
  });

  test('`toString()`', () => {
    var motif = new Motif('CUGCCA');

    expect(motif.toString()).toBe('CUGCCA');
  });
});
