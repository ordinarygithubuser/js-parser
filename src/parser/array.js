import * as Require from './require';

import parseExpression from './expression';

export function parseArrayDefinition (tokens) {
    let elements = [];
    let first = true;

    Require.arrayStart(tokens.pop());
    while (!Require.isArrayEnd(tokens.peek())) {
        if (!first) Require.enumeration(tokens.pop());
        else first = false;
        elements.push(parseExpression(tokens));
    }
    Require.arrayEnd(tokens.pop());

    return {
        type: 'Array',
        elements: elements
    };
}

export function parseArrayAccess (tokens) {
    Require.arrayStart(tokens.pop());
    let value = parseExpression(tokens);
    Require.arrayEnd(tokens.pop());

    return {
        type: 'ArrayAccess',
        value: value
    };
}
