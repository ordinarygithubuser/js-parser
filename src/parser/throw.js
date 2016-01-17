import * as Require from './require';

import parseBlock from './block';

export default function parseThrow (tokens) {
    Require.throwStatement(tokens.pop());

    return {
        type: 'Throw',
        block: parseBlock(tokens)
    };
}