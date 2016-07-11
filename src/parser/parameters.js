import * as Require from './require';

import parseList from './list';

const Parameter = token => ({
    type: 'Parameter',
    name: token.value
});

export default tokens => {
    const params = [];

    Require.parameterStart(tokens.pop());
    // TODO: compound param
    parseList(tokens,
        ts => Require.isIdentifier(ts.peek()),
        ts => params.push(Parameter(ts.pop()))
    );
    Require.parameterEnd(tokens.pop());
    return params;
}