import * as Require from './require';

import parseList from './list';

export default function parseParameters (tokens) {
    let params = [];
    Require.parameterStart(tokens.pop());

    // TODO: compound param
    parseList(tokens,
        ts => Require.isIdentifier(ts.peek()),
        ts => params.push({ name: ts.pop().value })
    );

    Require.parameterEnd(tokens.pop());
    return params;
}