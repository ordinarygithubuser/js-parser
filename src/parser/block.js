import * as Require from './require';

import parseStatement from './statement';

export default function parseBlock (tokens) {
    let statements = [];

    Require.scopeStart(tokens.pop());
    while (!Require.isScopeEnd(tokens.peek())) {
        statements.push(parseStatement(tokens));
    }
    Require.scopeEnd(tokens.pop());

    return {
        type: 'Block',
        statements: statements
    };
}