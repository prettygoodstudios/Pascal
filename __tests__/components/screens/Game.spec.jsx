import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Game from '../../../src/components/screens/Game';
import { generatePascalTriangle } from '../../../src/helpers/generatePascalTriangle';

describe('<Game />', () => {
    const boxSize = 54;

    async function dragBox(box, position) {
        await fireEvent.mouseDown(box);
        await fireEvent.mouseMove(box, { clientX: position[0] + boxSize / 2, clientY: position[1] + boxSize / 2});
        await fireEvent.mouseUp(box);
    }

    describe('dragging boxes', () => {
        test('drag n drop box with mouse', async () => {
            const wrapper = render(<Game />);
    
            const [box] = await wrapper.findAllByRole('application');
        
            await dragBox(box, [2000, 2000]);
    
            expect(box.style.transform).toBe('translate(2000px, 2000px)');
        });
    
        test('drag n drop box with touch', async () => {
            const wrapper = render(<Game />);
    
            const [box] = await wrapper.findAllByRole('application');
        
            await fireEvent.touchStart(box);
            await fireEvent.touchMove(box, { touches: [{ clientX: 2000 + boxSize / 2, clientY: 2000 + boxSize / 2}] });
            await fireEvent.touchEnd(box);
            
            expect(box.style.transform).toBe('translate(2000px, 2000px)');
        });
    
        test('drag n drop box on slot', async () => {
            const wrapper = render(<Game />);
    
            const [slot] = await wrapper.findAllByRole('gridcell');
            const [box] = await wrapper.findAllByRole('application');
        
            const slotPosition = slot.style.transform.match(/-?[0-9]+/g);
    
            await dragBox(box, [+slotPosition[0], +slotPosition[1]]);
            
            expect(box.style.transform).toBe(slot.style.transform);
        });

        test('drag n drop box off slot', async () => {
            const wrapper = render(<Game />);
    
            const [slot] = await wrapper.findAllByRole('gridcell');
            const [box] = await wrapper.findAllByRole('application');
        
            const slotPosition = slot.style.transform.match(/-?[0-9]+/g);
    
            await dragBox(box, [+slotPosition[0], +slotPosition[1]]);
            await dragBox(box, [2000, 2000]);
            
            expect(box.style.transform).toBe('translate(2000px, 2000px)');
        });

        test('drag n drop box on occupied slot', async () => {
            const wrapper = render(<Game />);
    
            const [slot] = await wrapper.findAllByRole('gridcell');
            const [box, boxTwo] = await wrapper.findAllByRole('application');
        
            const slotPosition = slot.style.transform.match(/-?[0-9]+/g);
            const delta = 5;
    
            await dragBox(box, [+slotPosition[0] + delta, +slotPosition[1] + delta]);
            await dragBox(boxTwo, [+slotPosition[0] + delta, +slotPosition[1] + delta]);
            
            expect(box.style.transform).toBe(slot.style.transform);
            expect(boxTwo.style.transform).toBe(`translate(${+slotPosition[0] + delta}px, ${+slotPosition[1] + delta}px)`);
        });
    });

    test('rendering on mobile', async () => {
        const oldWidth = globalThis.innerWidth;
        Object.defineProperty(globalThis, 'innerWidth', { value: 300 });
        const wrapper = render(<Game />);
        expect((await wrapper.findAllByRole('gridcell')).length).toBeGreaterThan(0);
        expect((await wrapper.findAllByRole('application')).length).toBeGreaterThan(0);
        Object.defineProperty(globalThis, 'innerWidth', { value: oldWidth });
    });

    describe('playing rounds', () => {

        async function getTopRow(wrapper) {
            const slots = await wrapper.findAllByRole('gridcell');

            return (slots.length / 2) | 0;
        }

        async function pascalAgent(wrapper) {
            const slots = await wrapper.findAllByRole('gridcell');

            const topRow = await getTopRow(wrapper);
            
            const answer = [generatePascalTriangle(topRow), generatePascalTriangle(topRow + 1)].flat();
            const taken = new Set();
            const misingValues = new Set();
            const missing = [];

            for (let i = 0; i < answer.length; i++) {
                const [box] = (await wrapper.queryAllByText(answer[i])).filter(box => !taken.has(box));
                taken.add(box);

                const slot = slots[i];
                const slotPosition = slot.style.transform.match(/-?[0-9]+/g);
                if (box) {
                    await dragBox(box, [+slotPosition[0], +slotPosition[1]]);
                } else {
                    const missingValue = answer[i];
                    misingValues.add(missingValue);
                    missing.push({ answer: missingValue, slot });
                }
            }

            if (misingValues.size === 1) {
                for (const { slot } of missing) {
                    const [box] = (await wrapper.findAllByText('?')).filter(box => !taken.has(box));
                    taken.add(box);
                    const slotPosition = slot.style.transform.match(/-?[0-9]+/g);

                    if (box) {
                        await dragBox(box, [+slotPosition[0], +slotPosition[1]]);
                    }
                }
            }

            if (misingValues.size === 2) {
                const minAnswer = Math.min(...missing.map(({answer}) => answer));
                for (const { slot, answer } of missing) {
                    const [box] = (await wrapper.findAllByText(answer === minAnswer ? 'a' : 'b')).filter(box => !taken.has(box));
                    taken.add(box);
                    const slotPosition = slot.style.transform.match(/-?[0-9]+/g);

                    if (box) {
                        await dragBox(box, [+slotPosition[0], +slotPosition[1]]);
                    }
                }
            }

            const points = +(await wrapper.findByRole('status', /points/i)).textContent.match(/([0-9\,]+)/)[1].replace(',', '');
            
            expect(points).toBeGreaterThan(0);
        }

        test('playing a round', async () => {
            const wrapper = render(<Game />);
        
            await pascalAgent(wrapper);
        });

        test("it's mixing up the rounds", async () => {
            const wrapper = render(<Game />);
            const counter = {};
            for (let i = 0 ; i < 14; i++) {
                const topRow = await getTopRow(wrapper);
                if (!counter.hasOwnProperty(topRow)) {
                    counter[topRow] = 0;
                }
                counter[topRow] += 1;
                await pascalAgent(wrapper);
                wrapper.rerender(<Game />);
            }

            for (const count of Object.values(counter)) {
                expect(count).toBeLessThan(3);
                expect(count).toBeGreaterThan(0);
            }
        });
    });
});