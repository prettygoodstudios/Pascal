import React from "react";
import { render } from "@testing-library/react";
import { AnimatedTypography } from "../../../src/components/widgets/AnimatedTypography";

describe('<AnimatedTypography />', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('increase value', async () => {
        const wrapper = render(
            <AnimatedTypography
                Component="p" 
                from={0}
                to={100}
                format={v => v}
                duration={1_500}
            />
        );

        jest.advanceTimersByTime(1_500);

        await wrapper.findByText(/100/i);
    });

    test('decrease value', async () => {
        const wrapper = render(
            <AnimatedTypography
                Component="p" 
                from={200}
                to={100}
                format={v => v}
                duration={1_500}
            />
        );

        jest.advanceTimersByTime(1_500);

        await wrapper.findByText(/100/i);
    });

    test('unmount', () => {        
        const wrapper = render(
            <AnimatedTypography
                Component="p" 
                from={200}
                to={100}
                format={v => v}
                duration={1_500}
            />
        );

        wrapper.unmount();
    });
});
