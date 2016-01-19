import * as Constants from '../common/constants';

/**
 * Type checks, return true or false.
 */

export const isIdentifier = matches(Constants.IDENTIFIER);
export const isVariable = matchesOf(Constants.VARIABLE_TYPES);
export const isFunction = matches(Constants.KEYWORDS.function);
export const isAssignment = matches(Constants.SYMBOL_TYPES.Assignment);
export const isMethodCall = matches(Constants.SYMBOL_TYPES.RoundBracketOpen);
export const isLineEnd = matches(Constants.SYMBOL_TYPES.Semicolon);
export const isEnumeration = matches(Constants.SYMBOL_TYPES.Comma);
export const isParameterEnd = matches(Constants.SYMBOL_TYPES.RoundBracketClose);
export const isMemberAccess = matches(Constants.SYMBOL_TYPES.Point);

export const isCompoundStart = matches(Constants.SYMBOL_TYPES.SquareBracketOpen);
export const isCompoundEnd = matches(Constants.SYMBOL_TYPES.SquareBracketClose);

export const isScopeStart = matches(Constants.SYMBOL_TYPES.SquareBracketOpen);
export const isScopeEnd = matches(Constants.SYMBOL_TYPES.SquareBracketClose);

export const isReturnStatement = matches(Constants.KEYWORDS.return);
export const isCatchStatement = matches(Constants.KEYWORDS.catch);
export const isThrowStatement = matches(Constants.KEYWORDS.throw);
export const isWhileStatement = matches(Constants.KEYWORDS.while);
export const isElseStatement = matches(Constants.KEYWORDS.else);
export const isForStatement = matches(Constants.KEYWORDS.for);
export const isTryStatement = matches(Constants.KEYWORDS.try);
export const isIfStatement = matches(Constants.KEYWORDS.if);

export const isObjectStart = matches(Constants.SYMBOL_TYPES.SquareBracketOpen);
export const isObjectEnd = matches(Constants.SYMBOL_TYPES.SquareBracketClose);

export const isArrayStart = matches(Constants.SYMBOL_TYPES.EdgeBracketOpen);
export const isArrayEnd = matches(Constants.SYMBOL_TYPES.EdgeBracketClose);

export const isNull = matches(Constants.KEYWORDS.null);
export const isUndefined = matches(Constants.KEYWORDS.undefined);

export function isNone (token) {
    return isNull(token) || isUndefined(token);
}

export function isString (value) {
    return /^".*"$/.test(value) || /^'.*'$/.test(value);
}

/**
 * Helper too match a <token.type> against a <type>.
 */
function matches (type) {
    return function (token = { type: null }) {
        return token.type === type;
    }
}

function matchesOf (types) {
    return function (token = { type: null }) {
        return types[token.type] !== undefined;
    }
}

/**
 * Require calls, throw an error if the conditions aren't met.
 */

export const identifier = ensure(Constants.IDENTIFIER, 'Identifier');
export const variable = ensureOf(Constants.VARIABLE_TYPES, 'Variable');
export const func =  ensure(Constants.KEYWORDS.function, 'Function');
export const assignment = ensure(Constants.SYMBOL_TYPES.Assignment, 'Assignment');
export const compoundStart = ensure(Constants.DESTRUCTED, 'Compound Start');
export const memberAccess = ensure(Constants.SYMBOL_TYPES.Point, 'Member Access');
export const enumeration = ensure(Constants.SYMBOL_TYPES.Comma, 'Enumeration');
export const keyValueAssignment = ensure(Constants.SYMBOL_TYPES.Colon, 'Key-Value Assignment');

export const arrayStart = ensure(Constants.SYMBOL_TYPES.EdgeBracketOpen, 'Array Start');
export const arrayEnd = ensure(Constants.SYMBOL_TYPES.EdgeBracketClose, 'Array End');

export const scopeStart = ensure(Constants.SYMBOL_TYPES.SquareBracketOpen, 'Scope Start');
export const scopeEnd = ensure(Constants.SYMBOL_TYPES.SquareBracketClose, 'Scope End');

export const parameterStart = ensure(Constants.SYMBOL_TYPES.RoundBracketOpen, 'Parameter Start');
export const parameterEnd = ensure(Constants.SYMBOL_TYPES.RoundBracketClose, 'Parameter End');

export const objectStart = ensure(Constants.SYMBOL_TYPES.SquareBracketOpen, 'Object Start');
export const objectEnd = ensure(Constants.SYMBOL_TYPES.SquareBracketClose, 'Object End');

export const importStatement = ensure(Constants.KEYWORDS.import, 'Import Statement');
export const returnStatement = ensure(Constants.KEYWORDS.return, 'Return Statement');
export const throwStatement = ensure(Constants.KEYWORDS.throw, 'Throw Statement');
export const whileStatement = ensure(Constants.KEYWORDS.while, 'While Statement');
export const forStatement = ensure(Constants.KEYWORDS.for, 'For Statement');
export const tryStatement = ensure(Constants.KEYWORDS.try, 'Try Statement');
export const ifStatement = ensure(Constants.KEYWORDS.if, 'If Statement');

/**
 * Helper function to throw an error of <type> and <token.type> do not match.
 */
function ensure (type, expected) {
    return function (token = { type: null }) {
        if (type !== token.type) throw new ParserError(token, expected);
    }
}

function ensureOf (types, expected) {
    return function (token = { type: null }) {
        if (![types[token.type]]) throw new ParserError(token, expected);
    }
}

/**
 * Constructs and returns a new ParserError.
 */
export function ParserError (token, ...types) {
    let expected = types.join(' or ');
    let err = new Error(`Expected Token ${expected} but got ${token.type}.`);
    err.token = token;
    err.name = 'ParserError';
    return err;
}