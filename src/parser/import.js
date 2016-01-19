import * as Require from './require';

import parseList from './list';

export default function parseImport (tokens) {
    let imp = {
        type: 'Import',
        main: null,
        list: [],
        file: null
    };

    Require.importStatement(tokens.pop());
    if (Require.isIdentifier(tokens.peek())) {
        imp.main = tokens.pop().value;

        if (Require.isEnumeration(tokens.peek())) {
            tokens.pop();
            imp.list = parseImportList(tokens);
        }
    } else if (Require.isScopeStart(tokens.peek())) {
        imp.list = parseImportList(tokens);
    }
    imp.file = parseFrom(tokens);
    return imp;
}

function parseImportList (tokens) {
    let list = [];

    Require.scopeStart(tokens.pop());
    parseList(tokens,
        ts => Require.isIdentifier(ts.peek()),
        ts => list.push({ type: 'Reference', value: ts.pop().value })
    );
    Require.scopeEnd(tokens.pop());
    return list;
}

function parseFrom (tokens) {
    Require.fromStatement(tokens.pop());
    let file = tokens.pop();
    Require.isString(file);
    return file.value;
}