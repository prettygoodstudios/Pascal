import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            points: 0,
            answer: [[], []],
            boxes: [],
            slots: [],
            arena: null
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
        
        this.setState({
            answer: rows,
            boxes,
            slots
        });
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
    
    componentWillUnMount(){

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

    snapBox = (boxId, slotId) => {
        const {boxes, slots, answer, arena} = this.state;
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
            console.log(correct);
            console.log(flattenedAnswer);
            console.log(slots);
            if(!correct){
                this.setState({
                    boxes,
                    slots
                });
            }else{
                this.startChallenge(arena);
            }
        }
    }
    
    render(){
        const {points, boxes, slots} = this.state;
        return(
            <div className="game">
                <div className="game__title">Pascal</div>
                <button className="game__pause">||</button>
                <div className="game__score">{points}</div>
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