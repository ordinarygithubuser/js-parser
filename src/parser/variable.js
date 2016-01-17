import * as Require from './require';

import parseCompound from './compound';
import { parsePrimaryExpression } from './expression';

export default function parseVariable (tokens) {
    Require.variable(tokens.peek());
    let variable =  { type: tokens.pop().type };

    Require.destructedOrIdentifier(tokens.peek());

    if (Require.isIdentifier(tokens.peek())) {
        variable.name = tokens.pop().value;
    } else {
        variable.names = parseCompound(tokens);
    }

    Require.assignment(tokens.pop());
    variable.expression = parsePrimaryExpression(tokens);
    return variable;
}