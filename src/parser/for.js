import * as Require from './require';

import parseExpression from './expression';
import parseVariable from './variable';
import parseBlock from './block';

export default tokens => {
    const statement = { type: 'For' };

    Require.forStatement(tokens.pop());

    Require.parameterStart(tokens.pop());
    statement.pre = parseVariableOrExpression(tokens);
    Require.lineEnd(tokens.pop());
    statement.condition = parseExpression(tokens);
    Require.lineEnd(tokens.pop());
    statement.post = parseExpression(tokens);
    Require.parameterEnd(tokens.pop());
    statement.body = parseBlock(tokens);

    return statement;
}

const parseVariableOrExpression = tokens => {
    if (Require.isVariable(tokens.peek())) {
        return parseVariable(tokens);
    }
    return parseExpression(tokens);
};