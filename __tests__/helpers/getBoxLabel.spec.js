const { getBoxLabel } = require("../../src/helpers/getBoxLabel");

describe('getBoxLabel()', () => {
    describe('before round 4', () => {
        test('matches mystery box', () => {
            expect(getBoxLabel(5, 1, [5])).toBe(5);
        });
        test("doesn't match mystery box", () => {
            expect(getBoxLabel(6, 1, [5])).toBe(6);
        });
    });
    describe('rounds 4 & 5', () => {
        test('matches mystery box', () => {
            expect(getBoxLabel(5, 4, [5])).toBe('?');
        });
        test("doesn't match mystery box", () => {
            expect(getBoxLabel(6, 4, [5])).toBe(6);
        });
    });
    describe('after round 6', () => {
        test('matches first mystery box', () => {
            expect(getBoxLabel(5, 8, [5, 3])).toBe('a');
        });
        test('matches second mystery box', () => {
            expect(getBoxLabel(3, 8, [5, 3])).toBe('b');
        });
        test("doesn't match mystery box", () => {
            expect(getBoxLabel(6, 8, [5, 3])).toBe(6);
        });
    });
});