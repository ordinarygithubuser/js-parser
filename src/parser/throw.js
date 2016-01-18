import * as Require from './require';

import parseExpression from './expression';

export default function parseThrow (tokens) {
    Require.throwStatement(tokens.pop());

    return {
        type: 'Throw',
        statements: parseExpression(tokens)
    };
}