import * as Require from './require';

import parseExpression from './expression';
import parseStatement from './statement';
import parseBlock from './block';

export default function parseIf (tokens) {
    let statement = { type: 'If' };

    Require.ifStatement(tokens.pop());
    Require.parameterStart(tokens.pop());
    statement.condition = parseExpression(tokens);
    Require.parameterEnd(tokens.pop());

    if (Require.isScopeStart(tokens.peek())) {
        statement.then = parseBlock(tokens);
    } else {
        statement.then = [ parseStatement(tokens) ];
    }

    if (Require.isElseStatement(tokens.peek())) {
        tokens.pop();
        statement.else = parseBlock(tokens)
    }
    return statement;
}
