import * as Constants from '../common/constants';

export function isKeyIdentPrefix (input) {
    return /^\d|[a-zA-Z]|_|"|'$/.test(input);
}

export function isKeyIdent (input) {
    return /^\d|[a-z]|_|"|'$/.test(input);
}

export function isWhitespace (input) {
    return Constants.NOISE[input];
}

export function isSymbol (input) {
    return Constants.SYMBOLS[input] !== undefined;
}

export function isOperator (input) {
    return Constants.OPERATORS[input] !== undefined;
}

export function isInvalid (input) {
    return !isKeyIdentPrefix(input) && !isSymbol(input) &&
        !isWhitespace(input) && !isOperator(input);
}