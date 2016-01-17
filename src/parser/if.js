import * as Require from './require';

import { parseSimpleExpression } from './expression';
import parseBlock from './block';

export default function parseIf (tokens) {
    let statement = { type: 'If' };

    Require.ifStatement(tokens.pop());
    Require.parameterStart(tokens.pop());
    statement.condition = parseSimpleExpression(tokens);
    Require.parameterEnd(tokens.pop());
    statement.then = parseBlock(tokens);

    if (Require.isElseStatement(tokens.peek())) {
        tokens.pop();
        statement.else = parseBlock(tokens)
    }

    return statement;
}
