const identity = item => item;

const Stream = (items = []) => {
    const add = item => items.push(item);

    const pop = () => items.splice(0, 1)[0];

    const peek = (depth = 0) => items[depth];

    const size = () => items.length;

    const copy = (filter = identity) => Stream(items.filter(filter));

    const list = (filter = identity) => items.filter(filter);

    return { add, pop, peek, size, copy, list };
};

export default Stream;