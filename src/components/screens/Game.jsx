import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";
import { PAUSE_GAME } from "../../constants/gameStates.js";
import { generatePascalLayout } from "../../helpers/generatePascalLayout.js";
import { shuffle } from "../../helpers/shuffle.js";
import { areBoxesColliding } from "../../helpers/areBoxesColliding.js";
import { getBoxLabel } from "../../helpers/getBoxLabel.js";
import { generatePascalTriangle } from "../../helpers/generatePascalTriangle.js";
import { AnimatedTypography } from "../widgets/AnimatedTypography.jsx";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            oldPoints: 0,
            points: 0,
            answer: [[], []],
            boxes: [],
            slots: [],
            arena: null,
            time: 30,
            round: 0,
            rounds: [],
            boxSize: 50,
        }
    }

    componentDidMount(){
        const arena = document.querySelector(".game__arena");
        this.setState({
            arena
        });
        this.startChallenge(arena);
    }

    startChallenge = (arena) => {
        const { round, rounds } = this.state;

        let topRow = Math.floor(Math.random()*8)+2;
        let tries = 0;
        
        while((rounds.indexOf(topRow) != -1 && tries < 9) || topRow === rounds[-1]){
            topRow = Math.floor(Math.random()*8)+2;
            tries++;
        }
        
        rounds.push(topRow);

        const rows = [
            generatePascalTriangle(topRow),
            generatePascalTriangle(topRow + 1),
        ];


        

        const boxSize = window.innerWidth > 450 ? 54 : 30;
        const slots = generatePascalLayout(topRow-1, topRow, boxSize, arena.clientWidth);
        const boxes = slots.map((box) => ({...box, y: box.y + 200}));

        // Pick mystery boxes
        
        const flatRows = rows.flat();
        const mysteryBoxes = shuffle([...new Set(flatRows)]).slice(0, 2);
        mysteryBoxes.sort((a, b) => a-b);


        // Assign values
        shuffle(flatRows).forEach((boxValue, boxIndex) => {
            boxes[boxIndex].value = boxValue;
            boxes[boxIndex].visibleValue = getBoxLabel(boxValue, round, mysteryBoxes);
        });

        this.setState({
            answer: rows,
            boxes,
            slots,
            time: 30,
            rounds,
            boxSize
        });

        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.updateTime, 1000);
    }

    updateTime = () => {
        const {time, points} = this.state;
        if(this.props.gameState != PAUSE_GAME){
            if(time - 1 == 0){
                this.props.endGame(points);
            } else {
                this.setState((prevState) => ({
                    time: prevState.time - 1
                }));
            }
        }
    }
    
    componentWillUnmount(){
        window.clearInterval(this.timer);
    }

    setBoxPosition = (id, x, y) => {
        const {boxes} = this.state;
        const box = boxes[id];
        box.x = x;
        box.y = y;
        this.setState({
            boxes
        });
    }

    unSelectSlot = (boxId) => {
        const { slots } = this.state;
        for (const slot of slots) {
            if (slot.boxId === boxId) {
                Object.assign(slot, {
                    ...slot,
                    value: -1,
                    boxId: -1
                })
                return;
            }
        }
        
    }
    
    startNewRound = () => {
        const {boxes, arena, time, points, round} = this.state;
        this.setState({
            points: points+boxes.length*50+time*50,
            round: round+1,
            oldPoints: points,
        });
        this.startChallenge(arena);
    }

    snapBox = (boxId, slotId) => {
        const {boxes, slots, answer} = this.state;
        let box = boxes[boxId];
        const slot = slots[slotId];
        if(slot.value == -1 || !slot.hasOwnProperty('value')){
            box = {
                ...box,
                x: slot.x,
                y: slot.y
            }
            boxes[boxId] = box;
            slots[slotId] = {
                ...slot,
                value: box.value,
                boxId
            }
            const flattenedAnswer = [...answer[0], ...answer[1]];
            let correct = true;
            for(let i = 0; i < slots.length; i++){
                if(slots[i].value != flattenedAnswer[i]){
                    correct = false;
                }
            }
            if(!correct){
                this.setState({
                    boxes,
                    slots
                });
            }else{
                this.startNewRound();
            }
        }
    }

    onDrop = (box, boxId) => {

        const euclideanDistance = (r1, r2) => {
            return Math.sqrt((r1.x - r2.x) ** 2 + (r1.y - r2.y) ** 2);
        }

        const collidingSlots = this.state.slots.map((s, i) => [s, i]).filter(([s]) => areBoxesColliding(box, { x: s.x, y: s.y, width: 54, height: 54 }));
        
        if (collidingSlots.length === 0) {
            return;
        }

        collidingSlots.sort(([s1], [s2]) => euclideanDistance(s1, box) - euclideanDistance(s2, box));

        const [[,selectedSlotId]] = collidingSlots;

        this.snapBox(boxId, selectedSlotId);
    }
    
    render(){
        const {points, boxes, slots, time, oldPoints, boxSize} = this.state;
        const {pauseGame, gameState} = this.props;

        return(
            <div className="game" style={{display: gameState == PAUSE_GAME ? "none" : "flex"}}>
                <div className="game__info">
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <button className="game__pause" onClick={() => pauseGame(points)} title="Pause">
                            <span></span>
                            <span></span>
                        </button>
                        <h1 className="game__title">Pascal</h1>
                    </div>
                    <div className="game__stats">
                        <p className="game__time">Time: {time}</p>
                        <AnimatedTypography
                            Component='p'
                            className="game__score"
                            from={oldPoints}
                            to={points}
                            format={(value) => `Points: ${Intl.NumberFormat().format(value | 0)}`}
                            title={ `Points: ${Intl.NumberFormat().format(points)}`}
                        />
                    </div>
                </div>
                <div className="game__arena">
                    {slots.map((s, i) => {
                        const {x, y} = s;
                        return <Slot x={x} y={y} id={i} key={i} size={boxSize}/>
                    })}
                    {boxes.map((b, i) => {
                        const {x, y, value, visibleValue} = b;
                        return (
                            <Box 
                                value={value}
                                x={x}
                                y={y}
                                setPosition={this.setBoxPosition}
                                id={i}
                                key={i}
                                visibleValue={visibleValue}
                                onDrop={this.onDrop}
                                size={boxSize}
                                onDragStart={this.unSelectSlot}
                                isSlotted={slots.map(s => s.boxId).includes(i)}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Game;