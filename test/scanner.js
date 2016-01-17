import Runner from 'test-runner';
import { scan } from '../src/scanner/scanner';

let suite = Runner('Scanner');

let letAssign = 'let a = 5;';

let func = `function f (p1, p2) {
    return Math.min(p1, p2);
};`;

suite.test('Let number assignment', test => {
    let tokens = scan(letAssign).list();

    test.equals(tokens[0].type, 'Let');
    test.equals(tokens[0].line, 0);
    test.equals(tokens[0].pos, 0);

    test.equals(tokens[1].type, 'Identifier');
    test.equals(tokens[1].line, 0);
    test.equals(tokens[1].pos, 4);
    test.equals(tokens[1].value, 'a');

    test.equals(tokens[2].type, 'Assignment');
    test.equals(tokens[2].pos, 6);

    test.equals(tokens[3].type, 'Identifier');
    test.equals(tokens[3].pos, 8);
    test.equals(tokens[3].value, '5');

    test.equals(tokens[4].type, 'Semicolon');
    test.equals(tokens[4].pos, 9);
});

suite.test('Function definition', test => {
    let tokens = scan(func).list();

    test.equals(tokens[0].type, 'Function');
    test.equals(tokens[0].line, 0);
    test.equals(tokens[0].pos, 0);

    test.equals(tokens[1].type, 'Identifier');
    test.equals(tokens[1].line, 0);
    test.equals(tokens[1].pos, 9);

    test.equals(tokens[2].type, 'RoundBracketOpen');
    test.equals(tokens[2].line, 0);
    test.equals(tokens[2].pos, 11);

    test.equals(tokens[4].type, 'Comma');
    test.equals(tokens[4].line, 0);
    test.equals(tokens[4].pos, 14);

    test.equals(tokens[8].type, 'Return');
    test.equals(tokens[8].line, 1);
    test.equals(tokens[8].pos, 4);
});

export default suite;