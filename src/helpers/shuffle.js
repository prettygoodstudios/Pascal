import { use } from "react";

const emptyMarker = Symbol();

/**
 * 
 * @param {Array} array 
 */
export function shuffle(array) {
    let used = 0;
    const copy = [...array];
    const output = [];
    while (used < array.length) {
        const index = (Math.random() * array.length) | 0;
        if (copy[index] !== emptyMarker) {
            output.push(copy[index]);
            copy[index] = emptyMarker;
            used += 1;
        }
    }
    return output;
}