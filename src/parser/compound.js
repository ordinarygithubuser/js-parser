import * as Require from './require';

// TODO compound parsing
export default function parseCompound (tokens) {
    let compound = { _: '' };

    Require.compoundStart(tokens.pop());
    while (!Require.isCompoundEnd(tokens.peek())) {
        compound._ += tokens.pop().value;
    }
    tokens.pop();
    return compound;
}