# Installation

With `npm`:

```
npm install @rnacanvas/search
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// some example imports
import { motifSearch, complementsSearch } from '@rnacanvas/search';
```

## `function motifSearch()`

Search for motifs within a sequence.

```javascript
var motif = 'CUGCCA';

var sequence = 'agCUGCCAugcga';

// returns a collection of match objects
var matches = [...motifSearch(motif, sequence)];

matches.length; // 1

// zero-based index of the match
matches[0].index; // 2

// one-based position of the match
matches[0].position; // 3

// the number of characters in the match
matches[0].length; // 6
```

Sequences of bases can also be input to the `motifSearch()` function instead of strings.

```javascript
var motif = [...'CUGCCA'].map(c => Nucleobase.create(c));

[...'agCUGCCAugcga'].forEach(c => app.drawing.addBase(c));

[...motifSearch(motif, app.drawing.bases)].length; // 1

[...motifSearch('CUGCCA', app.drawing.bases)].length; // 1
```

Any sequence of objects fulfilling the `TextContent` interface (below)
can be input to the `motifSearch()` function.

```typescript
interface TextContent {
  textContent: string;
}
```

Lowering the `cutoff` value allows for imperfect matches to be returned.

```javascript
var motif = 'CUGCCA';

var sequence = 'CaGCCA';

// no matches (cutoff is 1 by default)
[...motifSearch(motif, sequence)].length; // 0

[...motifSearch(motif, sequence, { cutoff: 0.8 }].length; // 1
```

The cutoff value can be "loosely" thought of as the proportion of the motif that must match the sequence for a match to be returned.

Gaps are allowed in matches.

Mismatch and gap penalties can also be specified.

```javascript
motifSearch('CUGCCA', 'agCUGCCAuca', {
  cutoff: 0.9,
  mismatchPenalty: -1,
  gapPenalty: -1.5,
});
```

By default, mismatch penalty is `-1` and gap penalty is `-1.5`.

(A matching pair corresponds to `+1` and the `cutoff` value is `1` by default.)

[IUPAC nucleic acid codes](https://www.bioinformatics.org/sms/iupac.html) are also recognized by the `motifSearch()` function.

```javascript
var motif = 'CYRCCA';

var sequence = 'aggCcGCCAugccCUaCCAag';

var matches = [...motifSearch(motif, sequence)];

matches.length; // 2
```

IUPAC code matching rules follow those of the `SequenceCharacter` class described below.

## `function complementsSearch()`

Search for complements to a motif within a sequence.

```javascript
var motif = 'CUGCCA';

var sequence = 'ucUGGCAGggacugca';

// returns a collection of complement objects
var complements = [...complementsSearch(motif, sequence)];

complements.length; // 1

// zero-based index of the complement
complements[0].index; // 2;

// one-based position of the complement
complements[0].position; // 3

// the number of characters in the complement
complements[0].length; // 6
```

Sequences of bases can also be input to the `complementsSearch()` function instead of strings.

```javascript
var motif = [...'CUGCCA'].map(c => Nucleobase.create(c));

[...'ucUGGCAGggacugca'].forEach(c => app.drawing.addBase(c));

[...complementsSearch(motif, app.drawing.bases)].length; // 1

[...complementsSearch('CUGCCA', app.drawing.bases)].length; // 1
```

Any sequence of objects fulfilling the `TextContent` interface (below)
can be input to the `complementsSearch()` function.

```typescript
interface TextContent {
  textContent: string;
}
```

Lowering the `cutoff` value allows for imperfect complements to be returned.

```javascript
var motif = 'CUGCCA';

var sequence = 'ucUGcCAGggacugca';

// no complements (cutoff is 1 by default)
[...complementsSearch(motif, sequence)].length; // 0

[...complementsSearch(motif, sequence, { cutoff: 0.8 }].length; // 1
```

The cutoff value "loosely" corresponds to the proportion of the motif that must be complementary to the sequence for a complement to be returned.

Gaps and `G:U` / `G:T` pairs are allowed in complements.

Mismatch, gap and wobble penalties can also be specified.

```javascript
complementsSearch('CUGCCA', 'ugUGGCAGgga', {
  cutoff: 0.9,
  mismatchPenalty: -1,
  gapPenalty: -1.5,
  wobblePenalty: -0.5,
});
```

By default, mismatch penalty is `-1`, gap penalty is `-1.5` and wobble penalty is `-0.5`.

(Wobble penalty applies to any `G:U` or `G:T` pairs in complements.)

A complementary pair in a complement corresponds to `+1`
and the `cutoff` value is `1` by default.

[IUPAC nucleic acid codes](https://www.bioinformatics.org/sms/iupac.html) are recognized by the `complementsSearch()` function.

```javascript
// Y stands for U or C
var motif = 'CYGCCA';

var sequence = 'caUGGCgGacugg';

[...complementsSearch(motif, sequence)].length; // 1
```

Rules for complementary pairs are the same as for the `SequenceCharacter` class described below.

## `function removeGapCharacters()`

Returns a new string with all periods and dashes having been removed from the input string.

Removing gap characters can make searching for motifs and complements a simpler task.

```javascript
removeGapCharacters('.A-GU..C--'); // "AGUC"

removeGapCharacters('---...'); // ""
```

## `function removeWhitespace()`

Returns a new string with all whitespace characters having been removed.

```javascript
removeWhitespace('A U\tG\nC\rT\r\n'); // "AUGCT"
```

## `class SequenceCharacter`

Represents a character in a sequence.

```javascript
var A = new SequenceCharacter('A');

A.toString(); // "A"

A.matches('A'); // true
A.matches('G'); // false

A.complements('U'); // true
A.complements('T'); // true
A.complements('G'); // false

// case doesn't matter
A.matches('a'); // true
A.complements('u'); // true

// IUPAC codes are recognized
A.matches('R'); // true
```

This constructor will throw for strings that are not composed of a single character.

```javascript
// empty string
new SequenceCharacter(''); // throws

// more than one character
new SequenceCharacter('AG'); // throws
new SequenceCharacter('asdf'); // throws
```

A `SequenceCharacter` instance may be created for any character, though.

### `toString()`

Returns the character as a string.

```javascript
var A = new SequenceCharacter('A');
A.toString(); // "A"

// preserves case
var r = new SequenceCharacter('r');
r.toString(); // "r"
```

### `matches()`

Returns `true` if the character matches the input character.

```javascript
var A = new SequenceCharacter('A');

A.matches('A'); // true
A.matches('C'); // false

// case doesn't matter
A.matches('a'); // true

// works for sequence character instances too
A.matches(new SequenceCharacter('A')); // true
```

[IUPAC nucleic acid codes](https://www.bioinformatics.org/sms/iupac.html) are recognized.

```javascript
var A = new SequenceCharacter('A');

A.matches('R'); // true
A.matches('Y'); // false

var N = new SequenceCharacter('N');

// the any character matches any non-gap character
N.matches('A'); // true
N.matches('p'); // true

// gap characters
var period = new SequenceCharacter('.');
var dash = new SequenceCharacter('-');

// gap characters only match other gap characters
period.matches('.'); // true
dash.matches('-'); // true

N.matches('.'); // false
N.matches('-'); // false
```

Returns `false` for empty strings and strings containing more than one character.

```javascript
var A = new SequenceCharacter('A');

// empty string
A.matches(''); // false

// strings containing more than one character
A.matches('AG'); // false
A.matches('asdf'); // false
```

### `complements()`

Returns `true` if the character complements the specified character.

```javascript
var A = new SequenceCharacter('A');

A.complements('U'); // true
A.complements('A'); // false

// T and U are interchangeable
A.complements('T'); // true

// case doesn't matter
A.complements('u'); // true

// sequence character instances can also be input
A.complements(new SequenceCharacter('U')); // true
```

[IUPAC nucleic acid codes](https://www.bioinformatics.org/sms/iupac.html) are recognized.

```javascript
var G = new SequenceCharacter('G');

// since G can pair with C, U and T
G.complements('Y'); // true

var U = new SequenceCharacter('U');

// since U can pair with A or G
U.complements('R'); // true

var N = new SequenceCharacter('N');

// the any character complements any non-gap character
N.complements('A'); // true

// gap characters
var period = new SequenceCharacter('.');
var dash = new SequenceCharacter('-');

// gap characters only complement other gap characters
period.complements('.'); // true
period.complements('-'); // true

N.complements('.'); // false
N.complements('-'); // false
```

Note that the special IUPAC codes
`S`, `W`, `K`, `M`, `B`, `D`, `H` and `V`
have no complements.

This method returns `false` for empty strings
and strings containing more than one character.

```javascript
var A = new SequenceCharacter('A');

// empty string
A.complements(''); // false

// strings containing more than one character
A.complements('AG'); // false
A.complements('asdf'); // false
```

## `function isWobblePair()`

Returns `true` if the two input characters form a `G:U` or `G:T` pair.

```javascript
isWobblePair('G', 'U'); // true
isWobblePair('G', 'T'); // true

isWobblePair('A', 'U'); // false
isWobblePair('G', 'C'); // false

// order doesn't matter
isWobblePair('U', 'G'); // true

// case doesn't matter
isWobblePair('g', 'u'); // true

var G = new SequenceCharacter('G');
var U = new SequenceCharacter('U');

// handles sequence character instances
isWobblePair(G, U); // true

var A = new SequenceCharacter('A');

isWobblePair(A, U); // false
```

Returns `false` for empty strings
and strings containing more than one character.

```javascript
isWobblePair('G', ''); // false

// each string must be a single character
isWobblePair('G', 'UT'); // false
```
