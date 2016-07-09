import * as Require from './require';

import parseExpression from './expression';
import parseBlock from './block';

export default tokens => {
    Require.whileStatement(tokens.pop());
    Require.parameterStart(tokens.pop());
    const condition = parseExpression(tokens);
    Require.parameterEnd(tokens.pop());

    return {
        type: 'While',
        condition: condition,
        body: parseBlock(tokens)
    };
}