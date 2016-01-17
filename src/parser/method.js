import * as Require from './require';

import { parseSimpleExpression } from './expression';
import parseList from './list';

export default function parseMethod (tokens) {
    let name = tokens.pop();
    let method = { name, args: [], type: 'Method' };

    Require.identifier(name);
    Require.parameterStart(tokens.pop());

    parseList(tokens,
        ts => Require.isIdentifier(ts.peek()),
        ts => method.args.push({ expression: parseSimpleExpression(ts) })
    );

    Require.parameterEnd(tokens.pop());
    return method;
}