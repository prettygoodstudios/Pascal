


/**
 * 
 * @param {Box} box1 
 * @param {Box} box2 
 * @returns {boolean}
 */
export function areBoxesColliding(box1, box2) {
    if (box1.x + box1.width < box2.x) {
        return false;
    }
    if (box1.x > box2.x + box2.width) {
        return false;
    }
    if (box1.y + box1.height < box2.y) {
        return false;
    }
    if (box1.y > box2.y + box2.height) {
        return false;
    }
    return true;
}