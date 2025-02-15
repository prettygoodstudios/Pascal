
/**
 * @callback GetLabel
 * @param {number} boxValue
 * @param {number} round 
 * @param {[number, number]} mysteryBoxes 
 * @returns {string}
 */

/**
 * @type {GetLabel}
 */
function getLabelForEarlyRounds(boxValue, round, mysteryBoxes) {
    return boxValue
}

/**
 * @type {GetLabel}
 */
function getLabelForMidRounds(boxValue, round, mysteryBoxes) {
    if (boxValue === mysteryBoxes?.[0]) {
        return '?';
    }
    return boxValue;
}

/**
 * @type {GetLabel}
 */
function getLabelForLateRounds(boxValue, round, mysteryBoxes) {
    if (boxValue === mysteryBoxes?.[0]) {
        return 'a';
    }
    if (boxValue === mysteryBoxes?.[1]) {
        return 'b';
    }
    return boxValue;
}
 
/**
 * @type {GetLabel}
 */
export function getBoxLabel() {
    const [,round] = arguments;

    if (round <= 3) {
        return getLabelForEarlyRounds(...arguments);
    }
    
    if (round <= 5) {
        return getLabelForMidRounds(...arguments);
    }

    return getLabelForLateRounds(...arguments);
}
