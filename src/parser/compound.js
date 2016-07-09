import * as Require from './require';

// TODO what is this? LOL
// TODO compound parsing
export default tokens => {
    const compound = { _: '' };

    Require.compoundStart(tokens.pop());
    while (!Require.isCompoundEnd(tokens.peek())) {
        compound._ += tokens.pop().value;
    }
    tokens.pop();
    return compound;
};