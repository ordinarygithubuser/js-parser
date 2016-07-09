import * as Require from './require';

import parseExpression from './expression';
import parseList from './list';

export default tokens => {
    const name = tokens.pop();
    const args = [];

    Require.identifier(name);
    Require.parameterStart(tokens.pop());
    parseList(tokens,
        ts => !Require.isParameterEnd(ts.peek()),
        ts => args.push(parseExpression(ts))
    );
    Require.parameterEnd(tokens.pop());

    return {
        type: 'Method',
        name: name.value,
        arguments: args
    };
}