import * as Constants from '../common/constants';
import * as States from './state';
import * as Matcher from './matcher';
import Machine from './machine';
import Transition from './transition';

/**
 *
 * Definition of machine transitions.
 * TODO: Comments
 *
 * whitespace   -> keyIdent     by isKeyIdentPrefix
 * whitespace   -> operator     by isOperator
 * whitespace   -> symbol       by isSymbol
 * whitespace   -> whitespace   by loop
 *
 * symbol       -> keyIdent     by isKeyIdentPrefix
 * symbol       -> whitespace   by isWhitespace
 * symbol       -> operator     by isOperator
 * symbol       -> symbol       by loop
 *
 * keyIdent     -> whitespace   by isWhitespace
 * keyIdent     -> operator     by isOperator
 * keyIdent     -> symbol       by isSymbol
 * keyIdent     -> keyIdent     by loop
 *
 * operator     -> keyIdent     by isKeyIdentPrefix
 * operator     -> whitespace   by isWhitespace
 * operator     -> symbol       by isSymbol
 *
 * invalid      -> invalid      by loop
 */
let transitions = [
    Transition(States.Whitespace, Matcher.isKeyIdentPrefix, States.KeywordIdentifier),
    Transition(States.Whitespace, Matcher.isOperator, States.Operator),
    Transition(States.Whitespace, Matcher.isSymbol, States.Symbol),
    Transition(States.Whitespace, Matcher.isSymbol),

    Transition(States.Symbol, Matcher.isKeyIdentPrefix, States.KeywordIdentifier),
    Transition(States.Symbol, Matcher.isWhitespace, States.Whitespace),
    Transition(States.Symbol, Matcher.isOperator, States.Operator),
    Transition(States.Symbol, Matcher.isSymbol),

    Transition(States.KeywordIdentifier, Matcher.isWhitespace, States.Whitespace),
    Transition(States.KeywordIdentifier, Matcher.isOperator, States.Operator),
    Transition(States.KeywordIdentifier, Matcher.isSymbol, States.Symbol),
    Transition(States.KeywordIdentifier, Matcher.isKeyIdent),

    Transition(States.Operator, Matcher.isKeyIdentPrefix, States.Whitespace),
    Transition(States.Operator, Matcher.isWhitespace, States.Operator),
    Transition(States.Operator, Matcher.isSymbol, States.Symbol),

    Transition(States.Invalid, Matcher.isKeyIdentPrefix, States.KeywordIdentifier),
    Transition(States.Invalid, Matcher.isWhitespace, States.Whitespace),
    Transition(States.Invalid, Matcher.isOperator, States.Operator),
    Transition(States.Invalid, Matcher.isSymbol, States.Symbol),
    Transition(States.Invalid, Matcher.isInvalid)
];

/**
 * Returns a Stream of Tokens from the String <text>.
 * @param text: The String to tokenize.
 * @returns Stream<Token>
 */
export function scan (text) {
    let startState = new States.Symbol();
    let defaultState = new States.Invalid();
    let machine = Machine(startState, defaultState, transitions);

    return machine.run(text).copy(token => {
        return token.type !== Constants.SYMBOLS[' '];
    });
}

