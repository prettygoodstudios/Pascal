import { getBoxXPosition } from "./getBoxXPosition";

/**
 * 
 * @param {number} startRow 
 * @param {number} endRow 
 * @param {number} boxSize 
 * @param {number} arenaWidth
 * @returns {Point[]}
 */
export function generatePascalLayout(
    startRow,
    endRow,
    boxSize,
    arenaWidth,
) {
    const boxes = [];
    for (let row = startRow; row <= endRow; row++) {
        const y = (row - startRow) * boxSize;
        const numberOfBoxes = row + 1;
        for (let boxIndex = 0; boxIndex < numberOfBoxes; boxIndex++) {
            boxes.push({
                x: getBoxXPosition(boxIndex, numberOfBoxes, boxSize, arenaWidth),
                y,
            });
        }
    }
    return boxes;
}