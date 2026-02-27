# Installation

With `npm`:

```
npm install @rnacanvas/search
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// some example imports
import { Motif, SequenceCharacter } from '@rnacanvas/search';
```

## `class Motif`

Represents a motif.

```javascript
var CUGCCA = new Motif('CUGCCA');

CUGCCA.toString(); // "CUGCCA"

// a single character motif
var A = new Motif('A');

A.toString(); // "A"

// empty motifs are accepted
var emptyMotif = new Motif('');

emptyMotif.toString(); // ""
```

### `toString()`

Returns the motif as a string.

```javascript
var CUGCCA = new Motif('CUGCCA');

CUGCCA.toString(); // "CUGCCA"
```

## `function removeGapCharacters()`

Returns a new string with all periods and dashes having been removed.

Removing gap characters can make searching for motifs and complements a simpler task.

```javascript
removeGapCharacters('.A-GU..C--'); // "AGUC"

removeGapCharacters('---...'); // ""
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

Throws for empty strings and strings containing more than one character.

```javascript
var A = new SequenceCharacter('A');

// empty string
A.matches(''); // throws

// strings containing more than one character
A.matches('AG'); // throws
A.matches('asdf'); // throws
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

This method throws for empty strings and strings containing more than one character.

```javascript
var A = new SequenceCharacter('A');

// empty string
A.complements(''); // throws

// strings containing more than one character
A.complements('AG'); // throws
A.complements('asdf'); // throws
```
