import * as Require from './require';

import { parsePrimaryExpression } from  './expression';

export default function parseReturn (tokens) {
    Require.returnStatement(tokens.pop());

    return {
        type: 'Return',
        value: parsePrimaryExpression(tokens)
    };
}