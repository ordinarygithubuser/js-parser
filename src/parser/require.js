import * as Constants from '../common/constants';

const matches = type => (token = { type: null }) => {
    return token.type === type;
};

const matchesOf = types => (token = { type: null }) => {
    return types[token.type] !== undefined;
};

const ensure = (matcher, expected) => (token = { type: null }) => {
    if (!matcher(token)) throw new ParserError(token, expected);
};

export const isIdentifier = matches(Constants.IDENTIFIER);
export const isString = matches(Constants.STRING);
export const isVariable = matchesOf(Constants.VARIABLE_TYPES);
export const isBinary = matchesOf(Constants.OPERATOR_TYPES);
export const isFunction = matches(Constants.KEYWORDS.function);
export const isAssignment = matches(Constants.SYMBOL_TYPES.Assignment);
export const isMethodCall = matches(Constants.SYMBOL_TYPES.RoundBracketOpen);
export const isLineEnd = matches(Constants.SYMBOL_TYPES.Semicolon);
export const isEnumeration = matches(Constants.SYMBOL_TYPES.Comma);
export const isMemberAccess = matches(Constants.SYMBOL_TYPES.Point);
export const isKeyValueAssignment = matches(Constants.SYMBOL_TYPES.Colon);
export const isDefaultStatement = matches(Constants.KEYWORDS.default);
export const isClass = matches(Constants.KEYWORDS.class);
export const isExtension = matches(Constants.KEYWORDS.extends);
export const isAsterisk = matches(Constants.OPERATOR_TYPES.Multiplication);
export const isAs = matches(Constants.KEYWORDS.as);

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

export const isAddition = matches(Constants.OPERATOR_TYPES.Addition);
export const isSubtraction = matches(Constants.OPERATOR_TYPES.Subtraction);
export const isMultiplication = matches(Constants.OPERATOR_TYPES.Multiplication);
export const isDivision = matches(Constants.OPERATOR_TYPES.Division);
export const isAnd = matches(Constants.OPERATOR_TYPES.And);
export const isOr = matches(Constants.OPERATOR_TYPES.Or);

export const isSmaller = matches(Constants.OPERATOR_TYPES.Smaller);
export const isGreater = matches(Constants.OPERATOR_TYPES.Greater);
export const isSmallerEquals = matches(Constants.OPERATOR_TYPES.SmallerEquals);
export const isGreaterEquals = matches(Constants.OPERATOR_TYPES.GreaterEquals);
export const isEquals = matches(Constants.OPERATOR_TYPES.Equals);

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

export const isNone = token => isNull(token) || isUndefined(token);


export const identifier = ensure(isIdentifier, 'Identifier');
export const variable = ensure(isVariable, 'Variable');
export const func =  ensure(isFunction, 'Function');
export const assignment = ensure(isAssignment, 'Assignment');
export const memberAccess = ensure(isMemberAccess, 'Member Access');
export const enumeration = ensure(isEnumeration, 'Enumeration');
export const keyValueAssignment = ensure(isKeyValueAssignment, 'Key-Value Assignment');
export const classDefinition = ensure(isClass, 'Class Definition');
export const arrayStart = ensure(isArrayStart, 'Array Start');
export const arrayEnd = ensure(isArrayEnd, 'Array End');
export const binaryExpression = ensure(isBinary, 'Binary Expression');
export const compoundStart = ensure(isCompoundStart, 'Compound Start');
export const compoundEnd = ensure(isCompoundEnd, 'Compound End');

export const scopeStart = ensure(isScopeStart, 'Scope Start');
export const scopeEnd = ensure(isScopeEnd, 'Scope End');

export const parameterStart = ensure(isParameterStart, 'Parameter Start');
export const parameterEnd = ensure(isParameterEnd, 'Parameter End');

export const objectStart = ensure(isObjectStart, 'Object Start');
export const objectEnd = ensure(isObjectEnd, 'Object End');

export const lineEnd = ensure(isLineEnd, 'Line End');

export const returnStatement = ensure(isReturnStatement, 'Return Statement');
export const importStatement = ensure(isImportStatement, 'Import Statement');
export const exportStatement = ensure(isExportStatement, 'Export Statement');
export const throwStatement = ensure(isThrowStatement, 'Throw Statement');
export const whileStatement = ensure(isWhileStatement, 'While Statement');
export const fromStatement = ensure(isFromStatement, 'From Statement');
export const forStatement = ensure(isForStatement, 'For Statement');
export const tryStatement = ensure(isTryStatement, 'Try Statement');
export const ifStatement = ensure(isIfStatement, 'If Statement');

/**
 * Constructs and returns a new ParserError.
 */
export const ParserError = (token, ...types) => {
    const expected = types.join(' or ');
    const err = new Error(`Expected Token ${expected} but got ${token.type}.`);
    err.token = token;
    err.name = 'ParserError';
    return err;
};