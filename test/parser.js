import Runner from 'test-runner';
import { parse } from '../src/parser/parser';
import { scan } from '../src/scanner/scanner';

let suite = new Runner('Parser');

function log (errors) {
    if (errors) {
        errors.map(err => console.log(err.stack, '\n----------------------\n'))
    }
}

suite.test('Let / Assignment / Number', test => {
    let { statements } = parse(scan('let a = 5;'));
    let first = statements[0];

    test.equals(first.type, 'Let');
    test.equals(first.name, 'a');
    test.equals(first.value.type, 'Number');
    test.equals(first.value.value, 5);
});

suite.test('Const / Assignment / String', test => {
    let { statements } = parse(scan('const b = "string";'));
    let first = statements[0];

    test.equals(first.type, 'Const');
    test.equals(first.name, 'b');
    test.equals(first.value.type, 'String');
    test.equals(first.value.value, 'string');
});

suite.test('Var / Assignment / Boolean', test => {
    let { statements } = parse(scan('var _c = true'));
    let first = statements[0];

    test.equals(first.type, 'Var');
    test.equals(first.name, '_c');
    test.equals(first.value.type, 'Boolean');
    test.equals(first.value.value, true);
});

suite.test('Return / Object', test => {
    let { statements } = parse(scan('return { name: "test", type: false };'));

    let first = statements[0];
    test.equals(first.type, 'Return');
    test.equals(first.value.type, 'Object');

    let members = first.value.members;
    test.equals(members.length, 2);
    test.equals(members[0].key, 'name');
    test.equals(members[0].value.type, 'String');
    test.equals(members[0].value.value, 'test');
    test.equals(members[1].key, 'type');
    test.equals(members[1].value.type, 'Boolean');
    test.equals(members[1].value.value, false);
});

suite.test('Function / Parameters', test => {
    let { statements } = parse(scan(`function f (p1, p2) {}`));
    let f = statements[0];

    test.equals(f.type, 'Function');
    test.equals(f.name, 'f');
    test.equals(f.parameters[0].name, 'p1');
    test.equals(f.parameters[1].name, 'p2');
});

suite.test('Member / Method / Arguments', test => {
    let { statements } = parse(scan(`
        obj.prop.nested.call(2, function f () {})
    }`));

    let obj = statements[0];
    test.equals(obj.type, 'Member');
    test.equals(obj.value.type, 'Member');
    test.equals(obj.value.value.type, 'Member');

    let method = obj.value.value.value;
    test.equals(method.type, 'Method');
    test.equals(method.arguments[0].type, 'Number');
    test.equals(method.arguments[0].value, 2);
    test.equals(method.arguments[1].type, 'Function');
});

suite.test('Function / Method / Return / Array', test => {
    let { statements } = parse(scan(`function f (p1, p2) {
        let max = Math.min(p1, p2);
        return [ max, max, max ];
    }`));

    let f = statements[0];
    test.equals(f.body[0].type, 'Let');
    test.equals(f.body[0].name, 'max');
    test.equals(f.body[0].value.type, 'Member');
    test.equals(f.body[0].value.ref, 'Math');
    test.equals(f.body[1].type, 'Return');
    test.equals(f.body[1].value.type, 'Array');
    test.equals(f.body[1].value.elements.length, 3);
    test.equals(f.body[1].value.elements[0].type, 'Reference');
    test.equals(f.body[1].value.elements[0].ref, 'max');
});

suite.test('If-Else / Block / Undefined / Null', test => {
    let { statements } = parse(scan(`
        if (cond()) { a = { test: null }; } else { return undefined; }
    `));

    let cond = statements[0];
    test.equals(cond.type, 'If');
    test.equals(cond.condition.type, 'Method');
    test.equals(cond.condition.name, 'cond');
    test.equals(cond.condition.arguments.length, 0);
    test.equals(cond.then[0].type, 'Assignment');
    test.equals(cond.then[0].ref.type, 'Object');
    test.equals(cond.then[0].ref.members.length, 1);
    test.equals(cond.then[0].ref.members[0].key, 'test');
    test.equals(cond.then[0].ref.members[0].value.type, 'Null');
    test.isNull(cond.then[0].ref.members[0].value.value);
    test.equals(cond.else[0].type, 'Return');
    test.equals(cond.else[0].value.type, 'Undefined');
    test.isUndefined(cond.else[0].value.value);
});

suite.test('While / If without braces', test => {
    let { statements } = parse(scan(`
        while (isFood({ p: true }, b())) {
            if (null) return a({ x: 2 });
        }
    `));

    let loop = statements[0];
    test.equals(loop.type, 'While');
    test.equals(loop.condition.type, 'Method');
    test.equals(loop.condition.name, 'isFood');

    let args = loop.condition.arguments;
    test.equals(args.length, 2);
    test.equals(args[0].type, 'Object');
    test.equals(args[0].members.length, 1);
    test.equals(args[0].members[0].key, 'p');
    test.equals(args[1].type, 'Method');
    test.equals(args[1].name[0], 'b');
    test.equals(args[1].arguments.length, 0);

    test.equals(loop.body[0].type, 'If');
    test.equals(loop.body[0].condition.type, 'Null');
    test.equals(loop.body[0].then[0].type, 'Return');
    test.equals(loop.body[0].then[0].value.type, 'Method');
    test.equals(loop.body[0].then[0].value.name, 'a');
    test.isUndefined(loop.body[0].else);
});

suite.test('Try Catch', test => {
    let { statements } = parse(scan(`
        try {
            somethingStupid();
        } catch (e) {
            console.log(e);
        }
    `));

    let first = statements[0];
    test.equals(first.type, 'Try');
    test.equals(first.try[0].type, 'Method');
    test.equals(first.try[0].name, 'somethingStupid');
    test.equals(first.catch.parameters.length, 1);
    test.equals(first.catch.parameters[0].type, 'Parameter');
    test.equals(first.catch.parameters[0].name, 'e');
    test.equals(first.catch.body[0].type, 'Member');
    test.equals(first.catch.body[0].ref, 'console');
    test.equals(first.catch.body[0].value.type, 'Method');
    test.equals(first.catch.body[0].value.name, 'log');
});

export default suite;