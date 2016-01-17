import * as Require from './require';

import parseFunction from './function';
import parseMethod from './method';
import parseMember from './member';
import parseObject from './object';

export function parsePrimaryExpression (tokens) {
    let next = tokens.peek();

    // TODO binary expressions
    if (Require.isIdentifier(next)) {
        return parseSimpleExpression(tokens);
    } else if (Require.isFunction(next)) {
        return parseFunction(tokens);
    } else if (Require.isObjectStart(next)) {
        return parseObject(tokens);
    }
    throw new Error(`Invalid Expression: ${next.type} ${next.value}`);
}

export function parseSimpleExpression (tokens) {
    // TODO array access, assignment
    if (Require.isMemberAccess(tokens.peek(1))) {
        return parseMember(tokens);
    } else if (Require.isMethodCall(tokens.peek(1))) {
        return parseMethod(tokens);
    } else {
        return convert(tokens.pop().value);
    }
}

function convert (val) {
    function type (type, value) {
        return { type, value };
    }

    if (/^\d+(\.(\d)*)?$/.test(val)) {
        return type('Number', parseFloat(val));
    } else if (val === 'true') {
        return type('Boolean', true);
    } else if (val === 'false') {
        return type('Boolean', false);
    } else if (/^".*"$/.test(val) || /^'.*'$/.test(val)) {
        return type('String', val.substr(1, val.length - 2));
    } else {
        return { type: 'Reference', ref: val };
    }
}