export function seq(len) {
    return Array.apply(null, { length: len }).map(Function.call, Number);
}