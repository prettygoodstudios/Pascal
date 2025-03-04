import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tutorial } from "../../../src/components/screens/Tutorial";

describe('<Tutorial />', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('playing through tutorial', async () => {
        const user = userEvent.setup({ delay: null });
        const wrapper = render(<Tutorial />);
        act(() => jest.advanceTimersByTime(20_000));

        const continueButton = await wrapper.findByRole('button', { name: /continue/i });
        await user.click(continueButton);
        wrapper.rerender(<Tutorial />);

        wrapper.findByText(/Have you ever tried/i);
    });
});
