import React, { useState } from "react";

import { generatePascalLayout } from "../../helpers/generatePascalLayout";
import { generatePascalTriangle } from "../../helpers/generatePascalTriangle"
import { shuffle } from "../../helpers/shuffle";
import Box from "./Box.jsx";
import Slot from "./Slot.jsx";
import { getSlotToSnapTo } from "../../helpers/getSlotToSnapTo.js";

const triangle = [
    generatePascalTriangle(3),
    generatePascalTriangle(4),
].flat();
const shuffled = shuffle(triangle);
const boxSize = 50;
const layout = generatePascalLayout(2, 3, boxSize, window.innerWidth);
const initialBoxes = layout.map(({x, y}, i) => ({id: i, x, y: y + 200, value: shuffled[i] }));
const initialAnswer = triangle.map(() => null);

export const PracticeRound = () => {
    const [boxes, setBoxes] = useState(initialBoxes);
    const [answer, setAnswer] = useState(initialAnswer);

    return (
        <div className="PracticeRound">
            {
                layout.map(({x, y}) => (
                    <Slot x={x} y={y} size={boxSize} key={`${x},${y}`} />
                ))
            }
            {
                boxes.map(({x, y, id, value}) => (
                    <Box 
                        x={x}
                        y={y}
                        id={id}
                        size={boxSize}
                        key={id}
                        value={value}
                        visibleValue={value}
                        setPosition={(id, x, y) => setBoxes(oldBoxes => oldBoxes.map((old) => old.id === id ? ({...old, x, y}) : old))}
                        onDragStart={(id) => {
                            setAnswer(oldAnswer => oldAnswer.map(v => v === id ? null : v))
                        }}
                        onDrop={({x, y}, id) => {
                            const {slot, slotIndex} = getSlotToSnapTo({x, y, width: boxSize, height: boxSize}, layout.map(({x, y}) => ({x, y, width: boxSize, height: boxSize})));
                            if (slot && answer[slotIndex] === null) {
                                setBoxes(oldBoxes => oldBoxes.map((old) => old.id === id ? ({...old, x: slot.x, y: slot.y}) : old));
                                setAnswer(oldAnswer => {
                                    const newAnswer = oldAnswer.map((old, i) => i === slotIndex ? id : old);
                                    if (JSON.stringify(newAnswer.map(id => boxes[id]?.value)) === JSON.stringify(triangle)) {
                                        alert('you did it')
                                    }
                                    return newAnswer;
                                });
                                
                            }
                        }}
                        arenaSelector='.PracticeRound'
                    />
                ))
            }
        </div>
    )
}