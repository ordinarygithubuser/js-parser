import * as Require from './require';

import parseExpression from './expression';

export default function parseObject (tokens) {
    let members = [];
    let first = true;

    Require.objectStart(tokens.pop());
    while (!Require.isObjectEnd(tokens.peek())) {
        members.push(parseKeyValue(tokens, first));
        first = false;
    }
    Require.objectEnd(tokens.pop());

    return {
        type: 'Object',
        members: members
    };
}

function parseKeyValue (tokens, first) {
    if (!first) Require.enumeration(tokens.pop());
    Require.identifier(tokens.peek());
    let key = tokens.pop().value;
    Require.keyValueAssignment(tokens.pop());
    let value = parseExpression(tokens);
    return { key, value };
}