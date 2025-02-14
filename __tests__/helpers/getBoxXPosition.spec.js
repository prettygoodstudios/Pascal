const { getBoxXPosition } = require("../../src/helpers/getBoxXPosition");

describe('getBoxXPosition()', () => {
    describe('box width: 1, arena width: 10', () => {
        test('box index 0: , number of boxes: 4', () => {
            expect(getBoxXPosition(0, 4, 1, 10)).toBe(3);
        });
        test('box index 1: , number of boxes: 4', () => {
            expect(getBoxXPosition(1, 4, 1, 10)).toBe(4);
        });
        test('box index 2: , number of boxes: 4', () => {
            expect(getBoxXPosition(2, 4, 1, 10)).toBe(5);
        });
        test('box index 3: , number of boxes: 4', () => {
            expect(getBoxXPosition(3, 4, 1, 10)).toBe(6);
        });
    });
    describe('box width: 2, arena width: 10', () => {
        test('box index 0: , number of boxes: 4', () => {
            expect(getBoxXPosition(0, 4, 2, 10)).toBe(1);
        });
        test('box index 1: , number of boxes: 4', () => {
            expect(getBoxXPosition(1, 4, 2, 10)).toBe(3);
        });
        test('box index 2: , number of boxes: 4', () => {
            expect(getBoxXPosition(2, 4, 2, 10)).toBe(5);
        });
        test('box index 3: , number of boxes: 4', () => {
            expect(getBoxXPosition(3, 4, 2, 10)).toBe(7);
        });
    });
    describe('box width: 2, arena width: 15', () => {
        test('box index 0: , number of boxes: 5', () => {
            expect(getBoxXPosition(0, 5, 2, 15)).toBe(2.5);
        });
        test('box index 1: , number of boxes: 5', () => {
            expect(getBoxXPosition(1, 5, 2, 15)).toBe(4.5);
        });
        test('box index 2: , number of boxes: 5', () => {
            expect(getBoxXPosition(2, 5, 2, 15)).toBe(6.5);
        });
        test('box index 3: , number of boxes: 5', () => {
            expect(getBoxXPosition(3, 5, 2, 15)).toBe(8.5);
        });
        test('box index 4: , number of boxes: 5', () => {
            expect(getBoxXPosition(4, 5, 2, 15)).toBe(10.5);
        });
    });
});
