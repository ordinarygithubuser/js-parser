import * as Require from './require';

import parseExpression from './expression';
import parseVariable from './variable';
import parseReturn from './return';
import parseImport from './import';
import parseWhile from './while';
import parseThrow from './throw';
import parseTry from './try';
import parseIf from './if';

export default function parseStatement (tokens) {
    let statement = parse(tokens);

    if (Require.isLineEnd(tokens.peek())) {
        tokens.pop();
    }
    return statement;
}

/**
 * TODO
 *  new (Expression..?)
 *  switch
 *  for
 *  class
 */
function parse (tokens) {
    let next = tokens.peek();

    if (Require.isLineEnd(next)) {
        return { type: 'EmptyStatement' };
    } else if (Require.isVariable(next)) {
        return parseVariable(tokens);
    } else if (Require.isImportStatement(next)) {
        return parseImport(tokens);
    } else if (Require.isReturnStatement(next)) {
        return parseReturn(tokens);
    } else if (Require.isWhileStatement(next)) {
        return parseWhile(tokens);
    } else if (Require.isThrowStatement(next)) {
        return parseThrow(tokens);
    } else if (Require.isTryStatement(next)) {
        return parseTry(tokens);
    } else if (Require.isIfStatement(next)) {
        return parseIf(tokens);
    }
    return parseExpression(tokens);
}