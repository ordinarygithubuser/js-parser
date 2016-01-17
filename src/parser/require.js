import * as Constants from '../common/constants';

/**
 * Type checks, return true or false.
 */

export function isIdentifier (token = { type: null }) {
    return matches(token, Constants.IDENTIFIER);
}

export function isVariable (token = { type: null }) {
    return Constants.VARIABLE_TYPES[token.type] !== undefined;
}

export function isFunction (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.function);
}

export function isCompoundStart (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.SquareBracketOpen);
}

export function isCompoundEnd (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.SquareBracketClose);
}

export function isMethodCall (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.RoundBracketOpen);
}

export function isScopeEnd (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.SquareBracketClose);
}

export function isLineEnd (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.Semicolon);
}

export function isEnumeration (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.Comma);
}

export function isReturnStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.return);
}

export function isMemberAccess (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.Point);
}

export function isTryStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.try);
}

export function isCatchStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.catch);
}

export function isThrowStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.throw);
}

export function isIfStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.if);
}

export function isElseStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.else);
}

export function isWhileStatement (token = { type: null }) {
    return matches(token ,Constants.KEYWORDS.while);
}

export function isForStatement (token = { type: null }) {
    return matches(token, Constants.KEYWORDS.for);
}

export function isObjectStart (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.SquareBracketOpen);
}

export function isObjectEnd (token = { type: null }) {
    return matches(token, Constants.SYMBOL_TYPES.SquareBracketClose);
}

/**
 * Helper too match a <token.type> against a <type>.
 */
function matches (token = { type: null }, type) {
    return token.type === type;
}

/**
 * Require calls, throw an error if the conditions aren't met.
 */

export function identifier (token) {
    ensure(token, Constants.IDENTIFIER);
}

export function variable (token) {
    ensureOf(token, Constants.VARIABLE_TYPES);
}

export function func (token ) {
    ensure(token, Constants.KEYWORDS.function);
}

export function assignment (token) {
    ensure(token, Constants.SYMBOL_TYPES.Assignment);
}

export function scopeStart (token) {
    ensure(token, Constants.SYMBOL_TYPES.SquareBracketOpen);
}

export function scopeEnd (token) {
    ensure(token, Constants.SYMBOL_TYPES.SquareBracketClose);
}

export function compoundStart (token) {
    ensure(token, Constants.DESTRUCTED);
}

export function parameterStart (token) {
    ensure(token,  Constants.SYMBOL_TYPES.RoundBracketOpen);
}

export function parameterEnd (token) {
    ensure(token, Constants.SYMBOL_TYPES.RoundBracketClose);
}

export function memberAccess (token) {
    ensure(token, Constants.SYMBOL_TYPES.Point);
}

export function returnStatement (token) {
    ensure(token, Constants.KEYWORDS.return);
}

export function tryStatement (token) {
    ensure(token, Constants.KEYWORDS.try);
}

export function throwStatement (token) {
    ensure(token, Constants.KEYWORDS.throw);
}

export function ifStatement (token) {
    ensure(token, Constants.KEYWORDS.if);
}

export function whileStatement (token) {
    ensure(token, Constants.KEYWORDS.while);
}

export function forStatement (token) {
    ensure(token, Constants.KEYWORDS.for);
}

export function objectStart (token) {
    ensure(token, Constants.SYMBOL_TYPES.SquareBracketOpen);
}

export function objectEnd (token) {
    ensure(token, Constants.SYMBOL_TYPES.SquareBracketClose);
}

export function enumeration (token) {
    ensure(token, Constants.SYMBOL_TYPES.Colon);
}

export function keyValueAssignment (token) {
    ensure(token, Constants.SYMBOL_TYPES.Colon);
}

export function destructedOrIdentifier (token = { type: null }) {
    if (!isIdentifier(token) && !isCompoundStart(token)) {
        throw new ParserError(token, Constants.DESTRUCTED, Constants.IDENTIFIER);
    }
}

/**
 * Helper function to throw an error of <type> and <token.type> do not match.
 */
function ensure (token = { type: null }, type) {
    if (type !== token.type) throw new ParserError(token, type);
}

function ensureOf (token = { type: null }, types) {
    if (![types[token.type]]) throw new ParserError(token, type);
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