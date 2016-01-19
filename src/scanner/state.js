import * as Constants from '../common/constants';
import UID from '../common/uid';

let nextID = UID();

/**
 * A State is localized by a line number <line> and
 * a position <pos> on this line. Each State owns a
 * unique id to determine it's identity.
 */
class State {
    constructor (line, pos) {
        this.id = nextID();
        this.line = line;
        this.pos = pos;
    }

    process (char, stream) {
        return 0;
    }

    finish (stream) {
        return 0;
    }

    matches (Type) {
        return this.constructor.name === Type.name;
    }

    add (stream, value, type) {
        let { line, pos } = this;
        stream.add({ value, type, line, pos });
    }

    equals (state) {
        return this.id === state.id;
    }
}

/**
 * Processes multiple characters by storing them ordered
 * in the variable <values> as a String.
 */
class MultiChar extends State {
    constructor(line, pos) {
        super(line, pos);
        this.value = '';
    }

    process (char, stream) {
        this.value += char;
    }
}

export class KeywordIdentifier extends MultiChar {
    finish (stream) {
        let { value } = this;
        let type = Constants.KEYWORDS[value];

        if (type) this.add(stream, value, type);
        else this.add(stream, value, 'Identifier');
    }
}

export class Symbol extends State {
    process (char, stream) {
        let type = Constants.SYMBOLS[char];
        if (type) this.add(stream, char , type);
    }
}

export class Operator extends MultiChar {
    finish (stream) {
        let { value } = this;
        let type = Constants.OPERATORS[value];

        if (type) this.add(stream, value, type);
    }
}

export class Invalid extends MultiChar {
    finish (stream) {
        if (this.value.length > 0) {
            this.add(stream, this.value, 'Invalid');
        }
    }
}

export class Whitespace extends MultiChar {
    finish (stream) {
        if (this.value.length > 0) {
            this.add(stream, this.value, 'Whitespace');
        }
    }
}

export class String extends MultiChar {
    finish (stream) {
        let value = this.value.substr(1, this.value.length);
        this.add(stream, value, 'String');
    }
}

export class StringEnd extends State {}