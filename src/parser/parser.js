import { isLineEnd } from './require';

import parseStatement from './statement';

export const parse  = tokens => {
    const statements = [];
    const errors = [];

    while (tokens.peek()) {
        try {
            statements.push(parseStatement(tokens));
        } catch (error) {
            errors.push(error);
            skipToLineEnd(tokens);
        }
    }
    return { statements, errors };
};

const skipToLineEnd = tokens => {
    if (!isLineEnd(tokens.pop()) && tokens.peek()) {
        skipToLineEnd(tokens);
    }
};