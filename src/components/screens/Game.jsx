import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";
import { PAUSE_GAME } from "../../constants/gameStates.js";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            points: 0,
            answer: [[], []],
            boxes: [],
            slots: [],
            arena: null,
            time: 30
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
        const topRow = Math.floor(Math.random()*6)+1;
        const rows = [];
        rows.push(this.generatePascalTriangle(topRow));
        rows.push(this.generatePascalTriangle(topRow+1));

        const boxes = [];
        const slots = [];
        let index = 0;
        const firstHalf = Math.floor((rows[0].length+rows[1].length)/2);
        rows.forEach((r) => {
            r.forEach((b) => {
                const offsetX = arena.clientWidth*0.5-(firstHalf+1)*27;
                let y = arena.clientHeight - 150;
                let slotY = 150;
                let x = offsetX+index*54-25;
                if(index <= firstHalf){
                    y += 54;
                    slotY += 54;
                }else{
                    x = offsetX+(index-firstHalf-1)*54;
                }
                boxes.push({
                    value: b,
                    x,
                    y
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

        boxes.sort();
        for (let i = 0; i < boxes.length; i++){
            const firstBox = Math.floor(Math.random()*boxes.length);
            const secondBox = Math.floor(Math.random()*boxes.length);
            const tempBox = boxes[firstBox];
            boxes[firstBox] = boxes[secondBox];
            boxes[secondBox] = tempBox;``
        }

        
        this.setState({
            answer: rows,
            boxes,
            slots,
            time: 30
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
        const {boxes, arena, time, points} = this.state;
        this.setState({
            points: points+boxes.length*50+time*50
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
                <button className="game__pause" onClick={() => pauseGame(points)}>||</button>
                <div className="game__time">{time}</div>
                <div className="game__score">Points: {points}</div>
                <div className="game__arena">
                    {slots.map((s, i) => {
                        const {x, y} = s;
                        return <Slot x={x} y={y} id={i} key={i} boxes={boxes} snapBox={this.snapBox} unSelectSlot={this.unSelectSlot}/>
                    })}
                    {boxes.map((b, i) => {
                        const {x, y, value} = b;
                        return <Box value={value} x={x} y={y} setPosition={this.setBoxPosition} id={i} key={i}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Game;