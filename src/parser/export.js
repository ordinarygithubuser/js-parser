import * as Require from './require';

import parseStatement from './statement';

export default tokens => {
    const exp = { type: 'Export', isDefault: false };
    Require.exportStatement(tokens.pop());

    if (Require.isDefaultStatement(tokens.peek())) {
        tokens.pop();
        exp.isDefault = true;
    }
    exp.value = parseStatement(tokens);
    return exp;
}