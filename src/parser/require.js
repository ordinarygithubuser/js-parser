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
export const isMemberAccess = matches(Constants.SYMBOL_TYPES.Point);
export const isKeyValueAssignment = matches(Constants.SYMBOL_TYPES.Colon);

export const isCompoundStart = matches(Constants.SYMBOL_TYPES.SquareBracketOpen);
export const isCompoundEnd = matches(Constants.SYMBOL_TYPES.SquareBracketClose);

export const isParameterStart = matches(Constants.SYMBOL_TYPES.RoundBracketOpen);
export const isParameterEnd = matches(Constants.SYMBOL_TYPES.RoundBracketClose);

export const isScopeStart = matches(Constants.SYMBOL_TYPES.SquareBracketOpen);
export const isScopeEnd = matches(Constants.SYMBOL_TYPES.SquareBracketClose);

export const isObjectStart = matches(Constants.SYMBOL_TYPES.SquareBracketOpen);
export const isObjectEnd = matches(Constants.SYMBOL_TYPES.SquareBracketClose);

export const isArrayStart = matches(Constants.SYMBOL_TYPES.EdgeBracketOpen);
export const isArrayEnd = matches(Constants.SYMBOL_TYPES.EdgeBracketClose);

export const isReturnStatement = matches(Constants.KEYWORDS.return);
export const isImportStatement = matches(Constants.KEYWORDS.import);
export const isExportStatement = matches(Constants.KEYWORDS.export);
export const isCatchStatement = matches(Constants.KEYWORDS.catch);
export const isThrowStatement = matches(Constants.KEYWORDS.throw);
export const isWhileStatement = matches(Constants.KEYWORDS.while);
export const isFromStatement = matches(Constants.KEYWORDS.from);
export const isElseStatement = matches(Constants.KEYWORDS.else);
export const isForStatement = matches(Constants.KEYWORDS.for);
export const isTryStatement = matches(Constants.KEYWORDS.try);
export const isIfStatement = matches(Constants.KEYWORDS.if);

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

export const identifier = ensure(isIdentifier, 'Identifier');
export const variable = ensure(isVariable, 'Variable');
export const func =  ensure(isFunction, 'Function');
export const assignment = ensure(isAssignment, 'Assignment');
export const memberAccess = ensure(isMemberAccess, 'Member Access');
export const enumeration = ensure(isEnumeration, 'Enumeration');
export const keyValueAssignment = ensure(isKeyValueAssignment, 'Key-Value Assignment');

export const arrayStart = ensure(isArrayStart, 'Array Start');
export const arrayEnd = ensure(isArrayEnd, 'Array End');

export const compoundStart = ensure(isCompoundStart, 'Compound Start');
export const compoundEnd = ensure(isCompoundEnd, 'Compound End');

export const scopeStart = ensure(isScopeStart, 'Scope Start');
export const scopeEnd = ensure(isScopeEnd, 'Scope End');

export const parameterStart = ensure(isParameterStart, 'Parameter Start');
export const parameterEnd = ensure(isParameterEnd, 'Parameter End');

export const objectStart = ensure(isObjectStart, 'Object Start');
export const objectEnd = ensure(isObjectEnd, 'Object End');

export const returnStatement = ensure(isReturnStatement, 'Return Statement');
export const importStatement = ensure(isImportStatement, 'Import Statement');
export const exportStatement = ensure(isExportStatement, 'Import Statement');
export const throwStatement = ensure(isThrowStatement, 'Throw Statement');
export const whileStatement = ensure(isWhileStatement, 'While Statement');
export const fromStatement = ensure(isFromStatement, 'From Statement');
export const forStatement = ensure(isForStatement, 'For Statement');
export const tryStatement = ensure(isTryStatement, 'Try Statement');
export const ifStatement = ensure(isIfStatement, 'If Statement');

/**
 * Helper function to throw an error of <type> and <token.type> do not match.
 */
function ensure (matcher, expected) {
    return function (token = { type: null }) {
        if (!matcher(token)) throw new ParserError(token, expected);
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