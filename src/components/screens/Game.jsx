import React, {Component} from "react";
import Box from "../widgets/Box.jsx";

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
        this.setState({
            arena: document.querySelector(".game__arena")
        });
        this.startChallenge();
    }

    startChallenge = () => {
        const topRow = Math.floor(Math.random()*6)+1;
        const rows = [];
        rows.push(this.generatePascalTriangle(topRow));
        rows.push(this.generatePascalTriangle(topRow+1));

        const boxes = [];

        rows.forEach((r) => {
            r.forEach((b) => {
                boxes.push(b);
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
    
    render(){
        const {points, boxes, arena} = this.state;
        const firstHalf = Math.floor(boxes.length/2);
        console.log(arena);
        return(
            <div className="game">
                <div className="game__title">Pascal</div>
                <button className="game__pause">||</button>
                <div className="game__score">{points}</div>
                <div className="game__arena">
                    {boxes.map((b, i) => {
                        const offsetX = arena.clientWidth*0.5-(firstHalf+1)*29;
                        let y = arena.clientHeight - 150;
                        let x = offsetX+i*58-25;
                        if(i <= firstHalf){
                            y += 58;
                        }else{
                            x = offsetX+(i%firstHalf)*58;
                        }
                        return <Box value={b} x={x} y={y} id={i} key={i}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Game;