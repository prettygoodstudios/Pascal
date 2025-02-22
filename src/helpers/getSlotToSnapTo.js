import { areBoxesColliding } from "./areBoxesColliding";
import { getEuclideanDistance } from "./getEuclideanDistance";

/**
 * 
 * @param {Box} box
 * @param {Box[]} slots
 * @returns {{ slot: Box | null, slotIndex: number | null  }}
 */
export function getSlotToSnapTo(box, slots) {
    const collidingSlots = slots.map((s, i) => [s, i]).filter(([s]) => areBoxesColliding(box, s));
        
    if (collidingSlots.length === 0) {
        return {
            slot: null,
            slotIndex: null,
        };
    }

    collidingSlots.sort(([s1], [s2]) => getEuclideanDistance(s1, box) - getEuclideanDistance(s2, box));

    const [[slot, slotIndex]] = collidingSlots;

    return {
        slot,
        slotIndex,
    }
}
