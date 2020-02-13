import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            points: 0,
            answer: [[], []],
            solution: [[], []],
            boxes: [],
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
        let index = 0;
        const firstHalf = Math.floor((rows[0].length+rows[1].length)/2);
        rows.forEach((r) => {
            r.forEach((b) => {
                const offsetX = arena.clientWidth*0.5-(firstHalf+1)*27;
                let y = arena.clientHeight - 150;
                let x = offsetX+index*54-25;
                if(index <= firstHalf){
                    y += 54;
                }else{
                    x = offsetX+(index%firstHalf)*54;
                }
                boxes.push({
                    value: b,
                    x,
                    y
                });
                index++;
            });
        });

        boxes.sort();
        
        this.setState({
            answer: rows,
            boxes
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
    
    render(){
        const {points, boxes, arena} = this.state;
        const firstHalf = Math.floor(boxes.length/2);
        return(
            <div className="game">
                <div className="game__title">Pascal</div>
                <button className="game__pause">||</button>
                <div className="game__score">{points}</div>
                <div className="game__arena">
                    {boxes.map((b, i) => {
                        const offsetX = arena.clientWidth*0.5-(firstHalf+1)*27;
                        let y = 150;
                        let x = offsetX+i*54-25;
                        if(i <= firstHalf){
                            y += 54;
                        }else{
                            x = offsetX+(i%firstHalf)*54;
                        }
                        return <Slot x={x} y={y} id={i} key={i} boxes={boxes}/>
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