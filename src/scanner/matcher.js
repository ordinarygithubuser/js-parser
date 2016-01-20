import * as Constants from '../common/constants';

export function isKeyIdentPrefix (input) {
    return /^\d|[a-zA-Z]|_$/.test(input);
}

export function isKeyIdent (input) {
    return /^\d|[a-zA-Z]|_$/.test(input);
}

export function isString (input) {
    return /^'|"$/.test(input);
}

export function isWhitespace (input) {
    return Constants.NOISE[input];
}

export function isSymbol (input) {
    return Constants.SYMBOLS[input] !== undefined;
}

export function isOperator (input, state) {
    return Constants.OPERATORS[input] !== undefined ||
        Constants.OPERATORS[input + state.value] !== undefined;
}

export function isStringEnd (input) {
    return input == '"'; // TODO other string variants
}

export function isAnyButStringEnd (input) {
    return input != '"';
}

export function isInvalid (input) {
    return !isKeyIdentPrefix(input) && !isSymbol(input) &&
        !isWhitespace(input) && !isOperator(input);
}