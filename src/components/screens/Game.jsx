import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";
import { PAUSE_GAME } from "../../constants/gameStates.js";
import { MOBILE_BREAK_POINT, LEGACY_MOBILE_BREAK_POINT } from "../../constants/breakPoints.js";

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
        const {round, rounds} = this.state;
        let topRow = Math.floor(Math.random()*8)+2;
        let tries = 0;
        while(rounds.indexOf(topRow) != -1 && tries < 9){
            topRow = Math.floor(Math.random()*8)+2;
            tries++;
        }
        rounds.push(topRow);
        const rows = [];
        rows.push(this.generatePascalTriangle(topRow));
        rows.push(this.generatePascalTriangle(topRow+1));

        const boxes = [];
        const slots = [];
        let index = 0;
        const firstHalf = Math.floor((rows[0].length+rows[1].length)/2);
        const flattenedBoxes = [...rows[0], ...rows[1]]
        const mysteryBoxes = [];
        mysteryBoxes.push(flattenedBoxes[Math.floor(Math.random()*flattenedBoxes.length)]);
        mysteryBoxes.push(flattenedBoxes[Math.floor(Math.random()*flattenedBoxes.length)]);

        while(mysteryBoxes[0] == mysteryBoxes[1]){
            mysteryBoxes[1] = flattenedBoxes[Math.floor(Math.random()*flattenedBoxes.length)];
        }

        mysteryBoxes.sort((a, b) => a-b);

        rows.forEach((r) => {
            r.forEach((b) => {
                const offsetX = arena.clientWidth*0.5-(firstHalf+1)*27;
                let slotY = 150;
                let x = offsetX+index*54-25;

                if(window.innerHeight <= MOBILE_BREAK_POINT){
                    slotY = 20;
                }

                if(index <= firstHalf){
                    slotY += 54;
                }else{
                    x = offsetX+(index-firstHalf-1)*54;
                }
                let visibleValue = b;
                if(round > 3 && round < 5 &&  mysteryBoxes[0] == b){
                    visibleValue = "?";
                }

                const mysteryBoxIndex = mysteryBoxes.indexOf(b);

                if(round > 4 && mysteryBoxIndex != -1){
                    if(mysteryBoxIndex == 0){
                        visibleValue = "a";
                    }else{
                        visibleValue = "b";
                    }
                }
                boxes.push({
                    value: b,
                    x: 0,
                    y: 0,
                    visibleValue
                });
                slots.push({
                    value: -1,
                    x,
                    y: slotY,
                    boxId: -1
                })
                index++;
            });
        });

        const newBoxes = [];
        while(boxes.length != 0){
            let index = Math.floor(Math.random()*boxes.length);
            newBoxes.push(boxes[index]);
            boxes.splice(index, 1);
        }

        newBoxes.forEach((b, i) => {
            const offsetX = arena.clientWidth*0.5-(firstHalf+1)*27;
                let y = arena.clientHeight - 150;
                let x = offsetX+i*54-25;

                if(window.innerHeight <= MOBILE_BREAK_POINT){
                    y = arena.clientHeight - 100;
                }

                if(window.innerHeight <= LEGACY_MOBILE_BREAK_POINT){
                    y += 20;
                }

                if(i <= firstHalf){
                    y += 54;
                }else{
                    x = offsetX+(i-firstHalf-1)*54;
                }

                newBoxes[i] = {
                    ...b,
                    x,
                    y
                }
        });
        this.setState({
            answer: rows,
            boxes: newBoxes,
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

    unSelectSlot = (id) => {
        const {slots} = this.state;
        slots[id] = {
            ...slots[id],
            value: -1,
            boxId: -1
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
        if(slot.value == -1){
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
            const flattenedAnswer = [...answer[1], ...answer[0]];
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
    
    render(){
        const {points, boxes, slots, time} = this.state;
        const {pauseGame, gameState} = this.props;

        return(
            <div className="game" style={{display: gameState == PAUSE_GAME ? "none" : "grid"}}>
                <div className="game__title">Pascal</div>
                <button className="game__pause" onClick={() => pauseGame(points)}>
                    <span></span>
                    <span></span>
                </button>
                <div className="game__time">{time}</div>
                <div className="game__score">Points: {points}</div>
                <div className="game__arena">
                    {slots.map((s, i) => {
                        const {x, y} = s;
                        return <Slot x={x} y={y} id={i} key={i} boxes={boxes} snapBox={this.snapBox} unSelectSlot={this.unSelectSlot}/>
                    })}
                    {boxes.map((b, i) => {
                        const {x, y, value, visibleValue} = b;
                        return <Box value={value} x={x} y={y} setPosition={this.setBoxPosition} id={i} key={i} visibleValue={visibleValue}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Game;