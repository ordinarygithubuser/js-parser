import * as Require from './require';

import parseParameters from './parameters';
import parseBlock from './block';

// TODO bound function
export const parseBoundFunction = tokens => {

};

const parseName = (tokens, anon) => {
    if (!anon) {
        Require.identifier(tokens.peek());
        return tokens.pop().value;
    } else if (Require.isIdentifier(tokens.peek())) {
        return tokens.pop().value;
    }
    return null;
};

const Function = (tokens, anon) => {
    return {
        type: 'Function',
        name: parseName(tokens, anon),
        parameters: parseParameters(tokens),
        body: parseBlock(tokens)
    }
};

export default (tokens, anon = false) => {
    Require.func(tokens.pop());
    return Function(tokens, anon);
};