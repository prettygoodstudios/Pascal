import React, {Component} from "react";
import Box from "../widgets/Box.jsx";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            points: 0,
            answer: [[], []],
            solution: [[], []],
            boxes: []
        }
    }

    componentDidMount(){
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
        const {points, boxes} = this.state;
        return(
            <div className="game">
                <div className="game__title">Pascal</div>
                <button className="game__pause">||</button>
                <div className="game__score">{points}</div>
                <div className="game__arena">
                    {boxes.map((b, i) => {
                        return <Box value={b} x={0} y={0} id={i} key={i}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Game;