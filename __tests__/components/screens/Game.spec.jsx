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
    });
    
    test('playing a round', async () => {
        const wrapper = render(<Game />);
    
        const slots = await wrapper.findAllByRole('gridcell');

        const topRow = (slots.length / 2) | 0;
        
        const answer = [generatePascalTriangle(topRow), generatePascalTriangle(topRow + 1)].flat();

        for (let i = 0; i < answer.length; i++) {
            const [box] = (await wrapper.findAllByText(answer[i])).filter(box => !box.hasAttribute('taken'));
            box.setAttribute('taken','true');

            const slot = slots[i];
            const slotPosition = slot.style.transform.match(/-?[0-9]+/g);
            await dragBox(box, [+slotPosition[0], +slotPosition[1]]);
        }

        const points = +(await wrapper.findByRole('status', /points/i)).textContent.match(/([0-9\,]+)/)[1].replace(',', '');

        expect(points).toBeGreaterThan(0);
    });
});