const { generatePascalLayout } = require("../../src/helpers/generatePascalLayout");

describe('generatePascalLayout()', () => {
    test('row 0 to 1', () => {
        expect(generatePascalLayout(0, 1, 1, 5)).toStrictEqual([
            {
                x: 2,
                y: 0,
            },
            {
                x: 1.5,
                y: 1,
            },
            {
                x: 2.5,
                y: 1,
            }
        ]);
    });
    test('row 1 to 2', () => {
        expect(generatePascalLayout(1, 2, 1, 5)).toStrictEqual([
            {
                x: 1.5,
                y: 0,
            },
            {
                x: 2.5,
                y: 0,
            },
            {
                x: 1,
                y: 1,
            },
            {
                x: 2,
                y: 1,
            },
            {
                x: 3,
                y: 1,
            }
        ]);
    });
    test('row 2 to 3', () => {
        expect(generatePascalLayout(2, 3, 1, 5)).toStrictEqual([
            {
                x: 1,
                y: 0,
            },
            {
                x: 2,
                y: 0,
            },
            {
                x: 3,
                y: 0,
            },
            {
                x: 0.5,
                y: 1,
            },
            {
                x: 1.5,
                y: 1,
            },
            {
                x: 2.5,
                y: 1,
            },
            {
                x: 3.5,
                y: 1,
            },
        ]);
    });
    test('row 0 to 3', () => {
        expect(generatePascalLayout(0, 3, 1, 5)).toStrictEqual([
            {
                x: 2,
                y: 0
            },
            {
                x: 1.5,
                y: 1,
            },
            {
                x: 2.5,
                y: 1,
            },
            {
                x: 1,
                y: 2,
            },
            {
                x: 2,
                y: 2,
            },
            {
                x: 3,
                y: 2,
            },
            {
                x: 0.5,
                y: 3,
            },
            {
                x: 1.5,
                y: 3,
            },
            {
                x: 2.5,
                y: 3,
            },
            {
                x: 3.5,
                y: 3,
            },
        ]);
    });
});

