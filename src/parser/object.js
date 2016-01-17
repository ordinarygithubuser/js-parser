import * as Require from './require';

import { parseSimpleExpression } from './expression';

export default function parseObject (tokens) {
    let object = { type: 'Object', members: [] };
    let first = true;

    Require.objectStart(tokens.pop());
    while (!Require.isObjectEnd(tokens.peek())) {
        object.members.push(parseKeyValue(tokens, first));
        first = false;
    }
    Require.objectEnd(tokens.pop());
    return object;
}

function parseKeyValue (tokens, first) {
    if (!first) Require.enumeration(tokens.pop());
    Require.identifier(tokens.peek());
    let key = tokens.pop().value;
    Require.keyValueAssignment(tokens.pop());
    let value = parseSimpleExpression(tokens);
    return { key, value };
}