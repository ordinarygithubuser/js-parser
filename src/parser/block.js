import * as Require from './require';

import parseStatement from './statement';

export default tokens => {
    const statements = [];

    Require.scopeStart(tokens.pop());
    while (!Require.isScopeEnd(tokens.peek())) {
        statements.push(parseStatement(tokens));
    }
    Require.scopeEnd(tokens.pop());

    return statements;
}