
/**
 * 
 * @param {Point} r1 
 * @param {Point} r2 
 * @returns 
 */
export function getEuclideanDistance(r1, r2) {
    return Math.sqrt((r1.x - r2.x) ** 2 + (r1.y - r2.y) ** 2);
}