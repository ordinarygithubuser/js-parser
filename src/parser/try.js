import * as Require from './require';

import parseParameters from './parameters';
import parseBlock from './block';

export default tokens => {
    const statement = { type: 'Try' };

    Require.tryStatement(tokens.pop());
    statement.try = parseBlock(tokens);
    if (Require.isCatchStatement(tokens.peek())) {
        tokens.pop();
        statement.catch = {
            parameters: parseParameters(tokens),
            body: parseBlock(tokens)
        };
    }
    return statement;
}