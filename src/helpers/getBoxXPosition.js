
/**
 * 
 * @param {number} boxIndex 
 * @param {number} numberOfBoxes 
 * @param {number} boxWidth 
 * @param {number} arenaWidth 
 * @returns {number}
 */
export function getBoxXPosition(boxIndex, numberOfBoxes, boxWidth, arenaWidth) {
    const halfOfRowWidth = numberOfBoxes * boxWidth * 0.5;
    const midPoint = arenaWidth / 2;
    const startingPoint = midPoint - halfOfRowWidth;

    return startingPoint + boxIndex * boxWidth;
}