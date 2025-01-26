import React from 'react';
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import App from "../../src/components/App";

describe('<App />', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('Viewing home screen', async () => {
        const wrapper = render(<App />);

        const title = await wrapper.findByRole('heading');
        expect(title.textContent).toBe('Pascal');

        const playButton = await wrapper.findByText(/play/i);
        expect(playButton instanceof HTMLButtonElement).toBe(true);

        const helpButton = await wrapper.findByText(/\?/i);
        expect(helpButton instanceof HTMLButtonElement).toBe(true);
    });

    test('Navigating to help screen', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const helpButton = await wrapper.findByRole('button', { name: /\?/i });
        await user.click(helpButton);

        const goBackButton = await wrapper.findByRole('button', { name: /go home/i });
        expect(goBackButton instanceof HTMLButtonElement).toBe(true);

        await user.click(goBackButton);

        const playButton = await wrapper.findByText(/play/i);
        expect(playButton instanceof HTMLButtonElement).toBe(true);
    });

    test('Navigating to game screen', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const playButton = await wrapper.findByRole('button', { name: /play/i });
        await user.click(playButton);

        const points = await wrapper.findByText(/points/i);
        expect(points instanceof HTMLElement).toBe(true);
    });

    test('Navigating to game screen and back', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const playButton = await wrapper.findByRole('button', { name: /play/i });
        await user.click(playButton);

        const points = await wrapper.findByText(/points/i);
        expect(points instanceof HTMLElement).toBe(true);

        const pauseButton = await wrapper.findByRole('button', { name: /pause/i });
        await user.click(pauseButton, { clientX: 20, clientY: 20 });

        const mainMenuButton = await wrapper.findByRole('button', { name: /main menu/i });
        await user.click(mainMenuButton);

        const secondPlayButton = await wrapper.findByText(/play/i);
        expect(secondPlayButton instanceof HTMLButtonElement).toBe(true);
    });
});
