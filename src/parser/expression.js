import * as Require from './require';

import { parseArrayDefinition, parseArrayAccess } from './array';
import parseAssignment from './assignment';
import parseFunction from './function';
import parseMethod from './method';
import parseMember from './member';
import parseObject from './object';

export default function parseExpression (tokens) {
    let next = tokens.peek();

    // TODO binary expressions
    if (Require.isFunction(next)) {
        return parseFunction(tokens);
    } else if (Require.isObjectStart(next)) {
        return parseObject(tokens);
    } else if (Require.isArrayStart(next)) {
        return parseArrayDefinition(tokens);
    } else if (Require.isNone(next)) {
        return parseNone(tokens);
    }
    return parseSimpleExpression(tokens);
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