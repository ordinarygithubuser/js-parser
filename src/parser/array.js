import * as Require from './require';

import parseExpression from './expression';

export const parseArrayDefinition = tokens => {
    const elements = [];
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
};

export const parseArrayAccess = tokens => {
    Require.arrayStart(tokens.pop());
    const value = parseExpression(tokens);
    Require.arrayEnd(tokens.pop());

    return {
        type: 'ArrayAccess',
        value: value
    };
};
