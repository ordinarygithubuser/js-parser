import * as Require from './require';

import { parseArrayDefinition, parseArrayAccess } from './array';
import parseAssignment from './assignment';
import parseFunction from './function';
import parseMethod from './method';
import parseMember from './member';
import parseObject from './object';
import parseClass from './class';

const Type = (type, value) => ({ type, value });
const Expression = (type, value) => ({ type, value });
const BinaryExpression = (type, left, right) => ({ type, left, right });

const parseExpression = (tokens, anon = true) => {
    const next = tokens.peek();
    let expr = null;

    // TODO binary expressions, new, !
    if (Require.isFunction(next)) {
        expr = parseFunction(tokens, anon);
    } else if (Require.isObjectStart(next)) {
        expr = parseObject(tokens);
    } else if (Require.isArrayStart(next)) {
        expr = parseArrayDefinition(tokens);
    } else if (Require.isNone(next)) {
        expr = parseNone(tokens);
    } else if (Require.isClass(next)) {
        expr = parseClass(tokens);
    } else {
        expr = parseSimpleExpression(tokens);
    }

    if (Require.isBinary(tokens.peek())) {
        return parseBinaryExpression(tokens, expr);
    }
    return expr;
};

const parseSimpleExpression = (tokens) => {
    const lookAhead = tokens.peek(1);

    if (Require.isMemberAccess(lookAhead)) {
        return parseMember(tokens);
    } else if (Require.isMethodCall(lookAhead)) {
        return parseMethod(tokens);
    } else if (Require.isAssignment(lookAhead)) {
        return parseAssignment(tokens);
    } else if (Require.isArrayStart(lookAhead)) {
        return parseArrayAccess(tokens);
    }
    return convert(tokens.pop());
};

const parseBinaryExpression = (tokens, left) => {
    const next = tokens.pop();
    Require.binaryExpression(next);

    // TODO & <, >, ==,  %
    if (Require.isAddition(next)) {
        return BinaryExpression('AdditionExpression', left, parseExpression(tokens));
    } else if (Require.isSubtraction(next)) {
        return BinaryExpression('SubtractionExpression', left, parseExpression(tokens));
    } else if (Require.isMultiplication(next)) {
        return BinaryExpression('MultiplicationExpression', left, parseExpression(tokens));
    } else if (Require.isDivision(next)) {
        return BinaryExpression('DivisionExpression', left, parseExpression(tokens));
    }else if (Require.isAnd(next)) {
        return BinaryExpression('AndExpression', left, parseExpression(tokens));
    } else if (Require.isOr(next)) {
        return BinaryExpression('OrExpression', left, parseExpression(tokens));
    }
    // TODO: awaited bin expr, but got none!
};

const parseNone = tokens => {
    const token = tokens.pop();

    if (Require.isNull(token)) {
        return Expression(token.type, null);
    } else {
        return Expression(token.type, undefined);
    }
};

const convert = token => {
    const val = token.value;

    if (/^\d+(\.(\d)*)?$/.test(val)) {
        return Type('Number', parseFloat(val));
    } else if (val === 'true') {
        return Type('Boolean', true);
    } else if (val === 'false') {
        return Type('Boolean', false);
    } else if (Require.isString(token)) {
        return Type('String', val);
    }
    return { type: 'Reference', ref: val };
};

export default parseExpression;