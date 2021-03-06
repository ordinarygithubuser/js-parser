import * as Require from './require';

export default (tokens, condition, method) => {
    let finished =  false;

    while (condition(tokens) && !finished) {
        method(tokens);

        if (Require.isEnumeration(tokens.peek())) {
            tokens.pop();
        } else {
            finished = true;
        }
    }
};