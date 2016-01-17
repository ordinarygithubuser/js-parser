import Runner from 'test-runner';
import { parse } from '../src/parser/parser';
import { scan } from '../src/scanner/scanner';

let suite = new Runner('Parser');

function log (errors) {
    if (errors) {
        errors.map(err => console.log(err.stack, '\n----------------------\n'))
    }
}

suite.test('Let number assignment', test => {
    let { statements, errors } = parse(scan('let a = 5;'));
    let first = statements[0];

    log(errors);

    test.equals(first.type, 'Let');
    test.equals(first.name, 'a');
    test.equals(first.expression.type, 'Number');
    test.equals(first.expression.value, 5);
});

suite.test('Const string assignment', test => {
    let { statements } = parse(scan('const b = "string";'));
    let first = statements[0];

    test.equals(first.type, 'Const');
    test.equals(first.name, 'b');
    test.equals(first.expression.type, 'String');
    test.equals(first.expression.value, 'string');
});

suite.test('Var boolean assignment', test => {
    let { statements } = parse(scan('var _c = true'));
    let first = statements[0];

    test.equals(first.type, 'Var');
    test.equals(first.name, '_c');
    test.equals(first.expression.type, 'Boolean');
    test.equals(first.expression.value, true);
});

suite.test('Function definition with parameters', test => {
    let { statements } = parse(scan(`function f (p1, p2) {}`));
    let f = statements[0];

    test.equals(f.type, 'Function');
    test.equals(f.name, 'f');
    test.equals(f.parameters[0].name, 'p1');
    test.equals(f.parameters[1].name, 'p2');
});

suite.test('Member access with function invocation', test => {
    let { statements } = parse(scan(`
        obj.prop.nested.call(2)
    }`));
});

suite.test('Function context with method invocation and return statement', test => {
    let { statements, errors } = parse(scan(`function f (p1, p2) {
        let max = Math.min(p1, p2);
        return max;
    }`));

    let f = statements[0];
    let val = f.block.statements[0];
    let ret = f.block.statements[1];

    test.equals(val.type, 'Let');
    test.equals(val.name, 'max');
    test.equals(val.expression.type, 'Member');
    test.equals(val.expression.ref, 'Math');

    test.equals(ret.type, 'Return');
    test.equals(ret.value.type, 'Reference');
    test.equals(ret.value.ref, 'max');
});

export default suite;