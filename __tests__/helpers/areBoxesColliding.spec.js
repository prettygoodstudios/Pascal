const { areBoxesColliding } = require('../../src/helpers/areBoxesColliding.js');

describe('areBoxesColliding()', () => {
    describe('colliding', () => {
        test('boxes are the same', () => {
            expect(areBoxesColliding({ x: 0, y: 0, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(true);
        });
        test('first box is to the left', () => {
            expect(areBoxesColliding({ x: -9, y: 0, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(true);
        });
        test('first box is to the right', () => {
            expect(areBoxesColliding({ x: 9, y: 0, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(true);
        });
        test('first box is above', () => {
            expect(areBoxesColliding({ x: 0, y: -9, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(true);
        });
        test('first box is below', () => {
            expect(areBoxesColliding({ x: 0, y: 9, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(true);
        });
    });
    describe('not colliding', () => {
        test('first box is to the left', () => {
            expect(areBoxesColliding({ x: -11, y: 0, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(false);
        });
        test('first box is to the right', () => {
            expect(areBoxesColliding({ x: 11, y: 0, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(false);
        });
        test('first box is above', () => {
            expect(areBoxesColliding({ x: 0, y: -11, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(false);
        });
        test('first box is below', () => {
            expect(areBoxesColliding({ x: 0, y: 11, width: 10, height: 10}, { x: 0, y: 0, width: 10, height: 10})).toBe(false);
        });
    });
});
