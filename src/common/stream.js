function identity (item) {
    return item;
}

export default function Stream (array = []) {
    function add (item) {
        array.push(item);
    }

    function pop () {
        return array.splice(0, 1)[0];
    }

    function peek (depth = 0) {
       return array[depth];
    }

    function size () {
        return array.length;
    }

    function copy (filter = identity) {
        return Stream(array.filter(filter));
    }

    function list (filter = identity) {
        return array.filter(filter);
    }

    return { add, pop, peek, size, copy, list };
}