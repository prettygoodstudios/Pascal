import { getSlotToSnapTo } from "../../src/helpers/getSlotToSnapTo";

describe('getSlotToSnapTo()', () => {
    test('not colliding', () => {
        expect(getSlotToSnapTo({x: 0, y: 0, width: 5, height: 5}, [{x: 100, y: 100, width: 5, height: 5}, {x: 150, y: 150, width: 5, height: 5}])).toStrictEqual({ slot: null, slotIndex: null });
    });
    test('collides with one slot', () => {
        expect(getSlotToSnapTo({x: 96, y: 96, width: 5, height: 5}, [{x: 100, y: 100, width: 5, height: 5}, {x: 150, y: 150, width: 5, height: 5}])).toStrictEqual({slot: {x: 100, y: 100, width: 5, height: 5}, slotIndex: 0});
    });
    test('collides with multiple slots', () => {
        expect(getSlotToSnapTo({x: 140, y: 140, width: 200, height: 200}, [{x: 100, y: 100, width: 5, height: 5}, {x: 150, y: 150, width: 5, height: 5}])).toStrictEqual({slot: {x: 150, y: 150, width: 5, height: 5}, slotIndex: 1});
    });
});
