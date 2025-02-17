import React, { useEffect, useRef  } from 'react'; 


export const AnimatedTypography = ({ from, to, Component, format, duration = 1000, delay = 0, ...props }) => {
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
        let animationFrame;
        const timeOut = setTimeout(() => {
            lastUpdated = Date.now();
            animationFrame = requestAnimationFrame(animate);
        }, delay);
        return () => {
            clearTimeout(timeOut);
            cancelAnimationFrame(animationFrame);
        };
    }, [from, to]);

    return <><Component {...props} ref={ref} role="presentation">{format(from)}</Component><Component role={props.role} style={{top: -1000, position: 'fixed'}}>{format(to)}</Component></>;
}