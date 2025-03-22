import React, { useState } from "react";

import { generatePascalLayout } from "../../helpers/generatePascalLayout";
import { generatePascalTriangle } from "../../helpers/generatePascalTriangle"
import { shuffle } from "../../helpers/shuffle";
import Box from "./Box.jsx";
import Slot from "./Slot.jsx";
import { getSlotToSnapTo } from "../../helpers/getSlotToSnapTo.js";
import { HandIcon } from "./HandIcon.jsx";

const triangle = [
    generatePascalTriangle(3),
    generatePascalTriangle(4),
].flat();
const shuffled = shuffle(triangle);
const boxSize = 50;
const layout = generatePascalLayout(2, 3, boxSize, window.innerWidth);
const distance = window.innerHeight > 450 ? 200 : 150; 
const initialBoxes = layout.map(({x, y}, i) => ({id: i, x, y: y + distance, value: shuffled[i] }));
const initialAnswer = triangle.map(() => null);

const states = {
    intro: {
        actions: ['practice'],
    },
    practice: {
        actions: [],
    }
}



export const PracticeRound = ({ onFinish }) => {
    const [state, setState] = useState(states.intro);
    const [boxes, setBoxes] = useState(initialBoxes);
    const [answer, setAnswer] = useState(initialAnswer);
    const [hint, setHint] = useState({...initialBoxes[0]});
    const [target, setTarget] = useState({...layout[triangle.indexOf(boxes[0].value)]});


    return (
        <div className="PracticeRound" onMouseDown={() => setState(states.practice)}>
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
                            const { slotIndex, slot } = getSlotToSnapTo({x, y, width: boxSize, height: boxSize}, layout.map(({x, y}) => ({x, y, width: boxSize, height: boxSize})));
                            
                            const newAnswer = answer.map((old, i) => i === slotIndex && old === null ? id : old);
                            if (JSON.stringify(newAnswer.map(id => boxes[id]?.value)) === JSON.stringify(triangle)) {
                                onFinish();
                            } else {
                                const newTarget = newAnswer.findIndex((a, i) => boxes[a]?.value !== triangle[i]);
                                const hintAnswer = triangle[newTarget];
                                const boxIndex = boxes.findIndex(b => b.value === hintAnswer && triangle[newAnswer.indexOf(b.id)] !== b.value);
                                if (boxIndex >= 0) {
                                    setTarget({...layout[newTarget]})
                                    setHint({...boxes[boxIndex]});
                                    setState(states.intro);
                                }
                            }
                            setAnswer(newAnswer);
                            setBoxes(oldBoxes => oldBoxes.map(old => old.id === id && slot && answer[slotIndex] === null ? {...old, x: slot.x, y: slot.y} : old));

                        }}
                        arenaSelector='.PracticeRound'
                        isSlotted={answer.includes(id)}
                    />
                ))
            }
            <HandIcon
                fill='#fff'
                width="50px"
                height="50px"
                preserveAspectRatio="xMinYMin"
                className="PracticeRound__dragHand"
                style={{ '--startX': hint.x + boxSize / 2, '--startY': hint.y + boxSize / 2, '--endX': target.x + boxSize / 2, '--endY': target.y + boxSize / 2, opacity: state === states.intro ? 1 : 0 }}
            />
        </div>
    )
}