import React, {Fragment, useEffect, useState} from "react";
import { generatePascalLayout } from "../../helpers/generatePascalLayout";
import { generatePascalTriangle } from "../../helpers/generatePascalTriangle";
import { classNames } from "../../helpers/classNames";

const numbers = [
    generatePascalTriangle(1),
    generatePascalTriangle(2),
    generatePascalTriangle(3),
    generatePascalTriangle(4),
    generatePascalTriangle(5),
    generatePascalTriangle(6),
].flat();
const boxSize = 50;
const layout = generatePascalLayout(0, 5, 50, window.innerWidth);
const maxY = layout.reduce((max, {y}) => Math.max(max, y), 0);
const totalDelay = layout.length * 100 + 500;

const TransitionBoxes = ({transitionBoxOne, transitionBoxTwo, numberOne, numberTwo}) => {
    const [showAddition, setShowAddition] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setShowAddition(true), 1000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            {showAddition && transitionBoxOne && (
                <div 
                className={'PascalTriangleAnimation__number PascalTriangleAnimation__addition'}
                style={{ transform: `translate(${transitionBoxOne.x}px, ${transitionBoxOne.y}px)`, '--size': boxSize, '--duration': 1000 }}
                >{numberOne} + {numberTwo}</div>
            )}
             { transitionBoxOne && (
                <div 
                    className={'PascalTriangleAnimation__number PascalTriangleAnimation__transitionBoxOne'}
                    style={{ transform: `translate(${transitionBoxOne.x}px, ${transitionBoxOne.y}px)`, '--size': boxSize, '--duration': 1000 }}
                >{numberOne}</div>
            )}
            { transitionBoxTwo && (
                <div 
                    className={'PascalTriangleAnimation__number PascalTriangleAnimation__transitionBoxTwo'}
                    style={{ transform: `translate(${transitionBoxTwo.x}px, ${transitionBoxTwo.y}px)`, '--size': boxSize, '--duration': 1000 }}
                >{numberTwo}</div>
            )}
        </>
    )
}

const getVisiblePointer = (pointer) => {
    const foundVisible = layout.findIndex(({x, y}) => layout[pointer] &&  x === layout[pointer].x + boxSize / 2 && y === layout[pointer].y + boxSize) - 1;
    if (foundVisible >= 0) {
        return foundVisible;
    }
    if (pointer < 0) {
        return -1;
    }
    return layout.length;
}

export const PascalTriangleAnimation = ({ onFinish }) => {
    const [pointer, setPointer] = useState(-2);
    const [hasFinished, setHasFinished] = useState(false);

    useEffect(() => {
        let adjustPointerInterval;
        const delayTimeout = setTimeout(() => {
            setPointer(1);
            adjustPointerInterval = setInterval(() => { 
                setPointer((oldPointer) => {
                    if (!layout[oldPointer + 2] || layout[oldPointer + 2].y === maxY) {
                        clearInterval(adjustPointerInterval);
                        return layout.length;
                    }
                    oldPointer++;
                    if (layout[oldPointer].y !== layout[oldPointer + 1].y) {
                        oldPointer++;
                    }
                    return oldPointer;
                });
            }, 1500);
        }, totalDelay);

        return () => {
            clearInterval(adjustPointerInterval);
            clearTimeout(delayTimeout);
        };
    }, [onFinish]);

    const visiblePointer = getVisiblePointer(pointer);

    useEffect(() => {
        if (!hasFinished && visiblePointer >= layout.length - 2) {
            setHasFinished(true);
            onFinish();
        }
    }, [visiblePointer]);
    

    const transitionBoxOne = layout[pointer];
    const transitionBoxTwo = layout[pointer + 1];

    return (
        <div className="PascalTriangleAnimation" style={{ height: boxSize * 6}}>
            {
                layout.map(({x, y}, i) => (
                    <Fragment key={`${x},${y}`}>
                        <div 
                            className="box fade-in" 
                            style={{ transform: `translate(${x}px, ${y}px)`, '--size': boxSize, '--delay': (i + 1) * 100, '--duration': 500, opacity: 0 }}
                        />
                        <div 
                            className={classNames({ 'PascalTriangleAnimation__number': true, 'fade-in': numbers[i] === 1 })}
                            style={{ transform: `translate(${x}px, ${y}px)`, '--size': boxSize, '--delay': (i + 1) * 100, '--duration': 500, opacity: i <= visiblePointer ? 1 : 0 }}
                        >{numbers[i]}</div>
                    </Fragment>
                ))
            }
            <TransitionBoxes key={pointer} transitionBoxOne={transitionBoxOne} transitionBoxTwo={transitionBoxTwo} numberOne={numbers[pointer]} numberTwo={numbers[pointer + 1]} />
        </div>
    )
}