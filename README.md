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
