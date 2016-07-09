import Stream from '../common/stream';

/**
 * A State Machine that runs a given set of <transitions>, starting
 * with <startState> as the first state and <defaultState> as a
 * default match when no state is found.
 *
 * @param startState: The initial state of the machine.
 * @param defaultState: The state returned when no match is found.
 * @param transitions: An array of valid transitions.
 * @returns {{ run: Function }}
 */
export default (startState, defaultState, transitions) => {
    const run = text => {
        const tokens = Stream();
        let state = startState;

        text.split('\n').map((chars, line) => {
            chars.split('').map((char, pos) => {
                state = step(tokens, state, { char, line, pos });
                state.process(char, tokens);
            });
        });
        state.finish(tokens);
        return tokens;
    };

    function step (stream, state, input) {
        for (const trans of transitions) {
            if (trans.matches(state, input.char)) {
                const nextState = trans.getNext(state, input);

                if (!nextState.equals(state)) {
                    state.finish(stream);
                }
                return nextState;
            }
        }
        state.finish(stream);
        return defaultState;
    }

    return { run };
}