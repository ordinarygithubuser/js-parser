import * as Require from './require';

import parseExpression from './expression';
import parseParameters from './parameters';
import parseBlock from './block';

export default tokens => {
    const clazz = { type: 'Class' };

    Require.classDefinition(tokens.pop());
    const name = tokens.pop();
    Require.identifier(name);
    clazz.name = name.value;

    if (Require.isExtension(tokens.peek())) {
        tokens.pop();
        clazz.base = parseExpression(tokens);
    }

    Require.scopeStart(tokens.pop());
    clazz.body = parseClassBody(tokens);
    Require.scopeEnd(tokens.pop());
    return clazz;
}

const parseClassBody = tokens => {
    const methods = [];

    while (!Require.isScopeEnd(tokens.peek())) {
        methods.push(parseClassMethod(tokens));
    }

    return methods;
};

const parseClassMethod = tokens => {
    const token = tokens.pop();
    Require.identifier(token);
    const params = parseParameters(tokens);
    const body = parseBlock(tokens);

    return {
        name: token.value,
        parameters: params,
        body: body
    };
};