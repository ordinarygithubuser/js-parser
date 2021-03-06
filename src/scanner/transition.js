/**
 * A Transitions defines which State <State> follows a given State <type>
 * and a <matcher> Function.
 *
 * @param type: Constructor of the State that owns this Transition.
 * @param matcher: Function that returns true or false given a char as input.
 * @param State: Constructor for the following State.
 * @returns {{ matches: Function, getNext: Function }}
 */
export default (type, matcher, State) => {
    const matches = (state, input) => {
        return state.matches(type) && matcher(input, state);
    };

    const getNext = (state, input) => {
        if (!State) return state;
        return new State(input.line, input.pos);
    };

    return { matches, getNext };
};