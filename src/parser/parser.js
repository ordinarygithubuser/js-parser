import { isLineEnd } from './require';

import parseStatement from './statement';

export function parse (tokens) {
    let statements = [];
    let errors = [];

    while(tokens.peek()) {
        try {
            statements.push(parseStatement(tokens));
        } catch (error) {
            errors.push(error);
            skipToLineEnd(tokens);
        }
    }
    return { statements, errors };
}

function skipToLineEnd (tokens) {
    if (!isLineEnd(tokens.pop()) && tokens.peek()) {
        skipToLineEnd(tokens);
    }
}