import * as Require from './require';

import parseExpression from './expression';

export default function parseAssignment (tokens) {
    let ref = tokens.pop();

    Require.identifier(ref);
    Require.assignment(tokens.pop());
    return {
        type: 'Assignment',
        ref: parseExpression(tokens)
    };
}