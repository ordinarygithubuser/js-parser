import * as Require from './require';

import parseExpression from './expression';

export default tokens => {
    const members = [];
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

const parseKeyValue = (tokens, first) => {
    if (!first) Require.enumeration(tokens.pop());
    Require.identifier(tokens.peek());
    const key = tokens.pop().value;
    Require.keyValueAssignment(tokens.pop());
    const value = parseExpression(tokens);
    return { key, value };
}