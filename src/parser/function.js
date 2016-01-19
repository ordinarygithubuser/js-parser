import * as Require from './require';

import parseParameters from './parameters';
import parseBlock from './block';

export default function parseFunction (tokens, anon = false) {
    Require.func(tokens.pop());
    return Function(tokens, anon);
}

// TODO bound function
export function parseBoundFunction (tokens) {

}

function parseName (tokens, anon) {
    if (!anon) {
        Require.identifier(tokens.peek());
        return tokens.pop().value;
    } else if (Require.isIdentifier(tokens.peek())) {
        return tokens.pop().value;
    }
    return null;
}

function Function (tokens, anon) {
    return {
        type: 'Function',
        name: parseName(tokens, anon),
        parameters: parseParameters(tokens),
        body: parseBlock(tokens)
    }
}