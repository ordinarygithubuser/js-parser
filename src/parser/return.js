import * as Require from './require';

import parseExpression from  './expression';

export default function parseReturn (tokens) {
    Require.returnStatement(tokens.pop());

    return {
        type: 'Return',
        value: parseExpression(tokens)
    };
}