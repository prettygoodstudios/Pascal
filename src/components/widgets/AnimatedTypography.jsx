import React, { useEffect, useRef  } from 'react'; 


export const AnimatedTypography = ({ from, to, Component, format, duration = 1000, ...props }) => {
    const ref = useRef();

    useEffect(() => {
        let value = from;
        let lastUpdated = Date.now();
        const step = (to - from) / duration;

        const animate = () => {
            ref.current.textContent = format(value);
            if (value === to) {
                return;
            }
            const delta = Date.now() - lastUpdated;
            lastUpdated += delta;
            const change = delta * step;
            if (Math.abs(value - to) <= Math.abs(change)) {
                value = to;
            } else {
                value += change;
            }
            animationFrame = requestAnimationFrame(animate);
        }

        let animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [from, to]);

    return <Component ref={ref} {...props}>{format(from)}</Component>;
}