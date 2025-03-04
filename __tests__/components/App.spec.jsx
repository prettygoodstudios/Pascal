import React from 'react';
import { fireEvent, render, act } from "@testing-library/react";
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

        act(() => {jest.advanceTimersByTime(40_000)});

        const goBackButton = await wrapper.findByRole('button', { name: /skip/i });
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

        const points = await wrapper.findByRole('status', /points/i)
        expect(points instanceof HTMLElement).toBe(true);
    });

    test('Navigating to game screen and back', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const playButton = await wrapper.findByRole('button', { name: /play/i });
        await user.click(playButton);

        const points = await wrapper.findByRole('status', /points/i);
        expect(points instanceof HTMLElement).toBe(true);

        const pauseButton = await wrapper.findByRole('button', { name: /pause/i });
        await user.click(pauseButton, { clientX: 20, clientY: 20 });

        const mainMenuButton = await wrapper.findByRole('button', { name: /main menu/i });
        await user.click(mainMenuButton);

        const secondPlayButton = await wrapper.findByText(/play/i);
        expect(secondPlayButton instanceof HTMLButtonElement).toBe(true);
    });

    test('Navigating to pause page and back to game page', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const playButton = await wrapper.findByRole('button', { name: /play/i });
        await user.click(playButton);

        const points = await wrapper.findByRole('status', /points/i);
        expect(points instanceof HTMLElement).toBe(true);

        const pauseButton = await wrapper.findByRole('button', { name: /pause/i });
        await user.click(pauseButton, { clientX: 20, clientY: 20 });

        jest.advanceTimersByTime(40_000);

        const resumeButton = await wrapper.findByRole('button', { name: /resume/i });
        await user.click(resumeButton);

        await wrapper.findByText(/time.*30/i);
    });

    test('Navigating to game screen and waiting until round is up', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const playButton = await wrapper.findByRole('button', { name: /play/i });
        await user.click(playButton);

        jest.advanceTimersByTime(40_000);

        await wrapper.findByRole('button', { name: /play again/i });
        await wrapper.findByRole('button', { name: /main menu/i });
    });

    test('play again', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);

        const playButton = await wrapper.findByRole('button', { name: /play/i });
        await user.click(playButton);

        jest.advanceTimersByTime(40_000);

        const playAgain = await wrapper.findByRole('button', { name: /play again/i });
        await user.click(playAgain);

        const points = await wrapper.findByRole('status', /points/i);
        expect(points instanceof HTMLElement).toBe(true);        
    });

    test('clicking PWA link', async () => {
        localStorage.clear();
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);
        const prompt = jest.fn();
        
        await fireEvent(window, Object.assign(new Event('beforeinstallprompt'), {userChoice: Promise.resolve(), prompt}));

        const downloadButton = await wrapper.findByRole('button', { name: /download/i });
        await user.click(downloadButton);

        expect(prompt).toHaveBeenCalledTimes(1);
        expect(wrapper.queryByRole('button', { name: /download/i })).toBe(null);
    });

    test('dismissing pwa popup', async () => {
        localStorage.clear();
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<App />);
        const prompt = jest.fn();
        
        await fireEvent(window, Object.assign(new Event('beforeinstallprompt'), {userChoice: Promise.resolve(), prompt}));

        const dismissPrompt = await wrapper.findByRole('button', { name: /dismiss/i });
        await user.click(dismissPrompt);

        expect(wrapper.queryByRole('button', { name: /dismiss/i })).toBe(null);
    });
});
