import * as Require from './require';

import { parseSimpleExpression } from './expression';

export default function parseMember (tokens) {
    let next = tokens.pop();
    let member = { type: 'Member', ref: next.value };

    Require.identifier(next);
    Require.memberAccess(tokens.pop());
    member.value = parseSimpleExpression(tokens);
    return member;
}