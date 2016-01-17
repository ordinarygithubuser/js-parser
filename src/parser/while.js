import * as Require from './require';

import { parseSimpleExpression } from './expression';
import parseBlock from './block';

export default function parseWhile (tokens) {
    Require.whileStatement(tokens.pop());
    Require.parameterStart(tokens.pop());
    let condition = parseSimpleExpression(tokens);
    Require.parameterEnd(tokens.pop());

    return {
        type: 'While',
        condition: condition,
        block: parseBlock(tokens)
    };
}