import * as Constants from '../common/constants';

export const isKeyIdentPrefix = (input) => {
    return /^\d|[a-zA-Z]|_$/.test(input);
};

export const isKeyIdent = (input) => {
    return /^\d|[a-zA-Z]|_$/.test(input);
};

export const isString = (input) => {
    return /^'|"$/.test(input);
};

export const isWhitespace = (input) => {
    return Constants.NOISE[input];
};

export const isSymbol = (input) => {
    return Constants.SYMBOLS[input] !== undefined;
};

export const isOperator = (input, state) => {
    return Constants.OPERATORS[input] !== undefined ||
        Constants.OPERATORS[input + state.value] !== undefined;
};

export const isStringEnd = (input) => {
    return input == '"'; // TODO other string variants
};

export const isAnyButStringEnd = (input) => {
    return input != '"';
};

export const isInvalid = (input) => {
    return !isKeyIdentPrefix(input) && !isSymbol(input) &&
        !isWhitespace(input) && !isOperator(input);
};