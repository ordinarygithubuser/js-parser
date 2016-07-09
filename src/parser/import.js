import * as Require from './require';

import parseList from './list';

export default tokens => {
    const imp = {
        type: 'Import',
        main: null,
        alias: null,
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
    } else if (Require.isAsterisk(tokens.peek())) {
        tokens.pop();
        if(Require.isAs(tokens.peek())) {
            tokens.pop();
            Require.isIdentifier(tokens.peek());
            imp.alias = tokens.pop().value;
        } else {
            imp.list = [ '*' ];
        }
    }
    imp.file = parseFrom(tokens);
    return imp;
}

const parseImportList = tokens => {
    const list = [];

    Require.scopeStart(tokens.pop());
    parseList(tokens,
        ts => Require.isIdentifier(ts.peek()),
        ts => list.push({ type: 'Reference', value: ts.pop().value })
    );
    Require.scopeEnd(tokens.pop());
    return list;
};

const parseFrom = tokens => {
    Require.fromStatement(tokens.pop());
    const file = tokens.pop();
    Require.isString(file);
    return file.value;
};