import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";
import { PAUSE_GAME } from "../../constants/gameStates.js";
import { generatePascalLayout } from "../../helpers/generatePascalLayout.js";
import { shuffle } from "../../helpers/shuffle.js";
import { areBoxesColliding } from "../../helpers/areBoxesColliding.js";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            points: 0,
            answer: [[], []],
            boxes: [],
            slots: [],
            arena: null,
            time: 30,
            round: 0,
            rounds: []
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
        
        while(rounds.indexOf(topRow) != -1 && tries < 9){
            topRow = Math.floor(Math.random()*8)+2;
            tries++;
        }
        
        rounds.push(topRow);

        const rows = [
            this.generatePascalTriangle(topRow),
            this.generatePascalTriangle(topRow+1)
        ];


        

        const boxSize = 54;
        const slots = generatePascalLayout(topRow-1, topRow, boxSize, arena.clientWidth);
        const boxes = slots.map((box) => ({...box, y: box.y + 200}));

        // Pick mystery boxes
        const mysteryBoxes = [];
        const flatRows = rows.flat();
        mysteryBoxes.push(flatRows[Math.floor(Math.random()*flatRows.length)]);
        mysteryBoxes.push(flatRows[Math.floor(Math.random()*flatRows.length)]);

        while(mysteryBoxes[0] == mysteryBoxes[1]){
            mysteryBoxes[1] = flatRows[Math.floor(Math.random()*flatRows.length)];
        }

        mysteryBoxes.sort((a, b) => a-b);


        // Assign values
        shuffle(flatRows).forEach((boxValue, boxIndex) => {
            boxes[boxIndex].value = boxValue;
            if (round <= 3 || !mysteryBoxes.includes(boxValue)) {
                boxes[boxIndex].visibleValue = boxValue;
            } else if (round <= 5 && boxValue === mysteryBoxes[0]) {
                boxes[boxIndex].visibleValue = '?';
            } else if (boxValue === mysteryBoxes[0]) {
                boxes[boxIndex].visibleValue = 'a';
            } else if (round > 5 && boxValue === mysteryBoxes[1]) {
                boxes[boxIndex].visibleValue = 'b';
            } else {
                boxes[boxIndex].visibleValue = boxValue;
            } 
        });

        this.setState({
            answer: rows,
            boxes,
            slots,
            time: 30,
            rounds
        });

        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.updateTime, 1000);
    }

    updateTime = () => {
        const {time, points} = this.state;
        if(this.props.gameState != PAUSE_GAME){
            if(time-1 == 0){
                this.props.endGame(points);
            }else{
                this.setState({
                    time: time-1
                });
            }
        }
    }
    
    generatePascalTriangle(n){
        if(n == 1){
            return [1];
        }
        const topRow = this.generatePascalTriangle(n-1);
        const newRow = [1];
        for(let i = 0; i < topRow.length-1; i++){
            newRow.push(topRow[i]+topRow[i+1]);
        }
        newRow.push(1);
        return newRow;
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
            round: round+1
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
        const {points, boxes, slots, time} = this.state;
        const {pauseGame, gameState} = this.props;

        return(
            <div className="game" style={{display: gameState == PAUSE_GAME ? "none" : "grid"}}>
                <div className="game__info">
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <button className="game__pause" onClick={() => pauseGame(points)} title="Pause">
                            <span></span>
                            <span></span>
                        </button>
                        <h1 className="game__title">Pascal</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem'}}>
                        <p className="game__time">Time: {time}</p>
                        <p className="game__score">Points: {points}</p>
                    </div>
                </div>
                <div className="game__arena">
                    {slots.map((s, i) => {
                        const {x, y} = s;
                        return <Slot x={x} y={y} id={i} key={i} />
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