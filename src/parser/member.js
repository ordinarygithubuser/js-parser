import * as Require from './require';

import parseExpression from './expression';

export default tokens => {
    const next = tokens.pop();
    const member = { type: 'Member', ref: next.value };

    Require.identifier(next);
    Require.memberAccess(tokens.pop());
    // Todo: what can follow obj. ?
    member.value = parseExpression(tokens);
    return member;
}