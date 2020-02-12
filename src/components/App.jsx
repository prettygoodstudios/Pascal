import React, {Component} from 'react';

import Home from "./screens/Home.jsx";
import Game from "./screens/Game.jsx";
import {HOME_STATE, GAME_STATE} from "../constants/gameStates";

class App extends Component{

    constructor(){
        super();

        this.state = {
            gameState: HOME_STATE
        }
    }

    componentDidMount(){
        
    }

    startGame = () => {
        this.setState({
            gameState: GAME_STATE
        });
    }

    render(){
        const {gameState} = this.state;
        return(
            <div>
                {gameState == HOME_STATE && <Home startGame={this.startGame}/>}
                {gameState == GAME_STATE && <Game />}
            </div>
        )
    }
}

export default App;