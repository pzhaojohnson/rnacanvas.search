# Installation

With `npm`:

```
npm install @rnacanvas/search
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// an example import
import { SequenceCharacter } from '@rnacanvas/search';
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

Any character may be input to the constructor, though.

### `toString()`

Simply returns the character as a string.

```javascript
var A = new SequenceCharacter('A');
A.toString(); // "A"

var R = new SequenceCharacter('R');
R.toString(); // "R"
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

var period = new SequenceCharacter('.');
var dash = new SequenceCharacter('-');

// gap characters only match other gap characters
period.matches('.'); // true
dash.matches('-'); // true
period.matches('N'); // false
```

Will throw for empty strings and strings containing more than one character.

```javascript
var A = new SequenceCharacter('A');

// empty string
A.matches(''); // throws

// strings containing more than one character
A.matches('AG'); // throws
A.matches('asdf'); // throws
```
