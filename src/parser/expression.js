import * as Require from './require';

import { parseArrayDefinition, parseArrayAccess } from './array';
import parseAssignment from './assignment';
import parseFunction from './function';
import parseMethod from './method';
import parseMember from './member';
import parseObject from './object';
import parseClass from './class';

export default function parseExpression (tokens, anon = true) {
    let next = tokens.peek();
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
}

function parseSimpleExpression (tokens) {
    let  lookAhead = tokens.peek(1);

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
}

function parseBinaryExpression (tokens, left) {
    let next = tokens.pop();
    Require.binaryExpression(next);

    function binExpr (type, right) {
        return { type, left, right }
    }

    // TODO &<, >, ==,  %
    if (Require.isAddition(next)) {
        return binExpr('AdditionExpression', parseExpression(tokens));
    } else if (Require.isSubtraction(next)) {
        return binExpr('SubtractionExpression', parseExpression(tokens));
    } else if (Require.isMultiplication(next)) {
        return binExpr('MultiplicationExpression', parseExpression(tokens));
    } else if (Require.isDivision(next)) {
        return binExpr('DivisionExpression', parseExpression(tokens));
    }else if (Require.isAnd(next)) {
        return binExpr('AndExpression', parseExpression(tokens));
    } else if (Require.isOr(next)) {
        return binExpr('OrExpression', parseExpression(tokens));
    }
}

function parseNone (tokens) {
    let token = tokens.pop();
    let expression = {
        type: token.type,
        value: undefined
    };

    if (Require.isNull(token)) {
        expression.value = null;
    }
    return expression;
}

function convert (token) {
    let val = token.value;

    function type (type, value) {
        return { type, value };
    }

    if (/^\d+(\.(\d)*)?$/.test(val)) {
        return type('Number', parseFloat(val));
    } else if (val === 'true') {
        return type('Boolean', true);
    } else if (val === 'false') {
        return type('Boolean', false);
    } else if (Require.isString(token)) {
        return type('String', val);
    }
    return { type: 'Reference', ref: val };
}