import * as Require from './require';

import parseExpression from './expression';
import parseCompound from './compound';

export default function parseVariable (tokens) {
    Require.variable(tokens.peek());
    let variable =  {
        type: tokens.pop().type,
        value: undefined
    };

    if (Require.isIdentifier(tokens.peek())) {
        variable.name = tokens.pop().value;
    } else {
        Require.isCompoundStart(tokens.peek());
        variable.names = parseCompound(tokens);
    }

    if (Require.isAssignment(tokens.peek())) {
        tokens.pop();
        variable.value = parseExpression(tokens);
    }
    return variable;
}