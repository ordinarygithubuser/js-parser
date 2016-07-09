import * as Require from './require';

import parseExpression from './expression';

export default tokens => {
    const clazz = { type: 'Class' };

    Require.classDefinition(tokens.pop());
    const name = tokens.pop();
    Require.identifier(name);
    clazz.name = name.value;

    if(Require.isExtension(tokens.peek())) {
        tokens.pop();
        clazz.base = parseExpression(tokens);
    }

    Require.scopeStart(tokens.pop());
    clazz.body = []; // TODO: Lots of fun
    Require.scopeEnd(tokens.pop());
    return clazz;
}