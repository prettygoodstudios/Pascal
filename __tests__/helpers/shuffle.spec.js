const { shuffle } = require("../../src/helpers/shuffle");

describe('shuffle()', () => {

    function computeBinomialConfidenceInterval(n, p, z) {
        const stdErr = Math.sqrt(p * (1 - p) / n);
        return [p - z * stdErr, p + z * stdErr];
    }

    test('10 elements', () => {
        const trials = 100_000;
        const [lowerBound, upperBound] = computeBinomialConfidenceInterval(trials, 0.1, 3.5);
        const results = Array(10).fill({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}).map(o => ({...o}));

        for (let n = 0; n < trials; n++) {
            const array = Array(10).fill(0).map((_, i) => i);
            const shuffled = shuffle(array);
            for (let i = 0; i < array.length; i++) {
                results[i][shuffled[i]] += 1;
            }
        }

        for (const result of results) {
            for (const value of Object.values(result)) {
                expect(value / trials).toBeGreaterThan(lowerBound);
                expect(value / trials).toBeLessThan(upperBound);
            }
        }
        
    });
});
