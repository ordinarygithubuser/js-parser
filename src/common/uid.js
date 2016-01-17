export default function UID (id = 0) {
    return function next () {
        return id++;
    }
}