import React, {Component} from 'react';

import Home from "./screens/Home.jsx";
import Game from "./screens/Game.jsx";
import EndGameMenu from "./screens/EndGameMenu.jsx";
import PauseGameMenu from "./screens/PauseGameMenu.jsx";
import { Tutorial } from './screens/Tutorial.jsx';

import {HOME_STATE, GAME_STATE, END_GAME, PAUSE_GAME, HELP_SCREEN, TUTORIAL} from "../constants/gameStates";

class App extends Component{

    constructor(){
        super();

        this.state = {
            gameState: HOME_STATE,
            points: 0
        }
    }

    async componentDidMount(){
        try {
            await screen.orientation.lock('landscape-primary');
        } catch {}
    }

    startGame = () => {
        this.setState({
            gameState: GAME_STATE
        });
    }

    endGame = (points) => {
        this.setState({
            gameState: END_GAME,
            points
        });
    }

    goHome = () => {
        this.setState({
            gameState: HOME_STATE
        });
    }

    pauseGame = (points) => {
        this.setState({
            gameState: PAUSE_GAME,
            points
        });
    }

    openHelp = () => {
        this.setState({
            gameState: HELP_SCREEN
        });
    }

    scrollListener = (e) => {
        e.preventDefault();
    }

    lockScroll = () => {
        document.body.addEventListener('touchmove', this.scrollListener, { passive: false });
    }

    unlockScroll = () => {
        document.body.removeEventListener("touchmove", this.scrollListener, {passive: true});
    }

    render(){
        const {gameState, points} = this.state;
        return(
            <div>
                {gameState === HOME_STATE && <Home startGame={this.startGame} openHelp={this.openHelp} lockScroll={this.lockScroll}/>}
                {gameState === PAUSE_GAME && <PauseGameMenu startGame={this.startGame} goHome={this.goHome} points={points}/>}
                {(gameState === GAME_STATE || gameState == PAUSE_GAME) && <Game endGame={this.endGame} gameState={gameState} pauseGame={this.pauseGame}/>}
                {gameState === END_GAME && <EndGameMenu startGame={this.startGame} goHome={this.goHome} points={points}/>}
                {gameState === HELP_SCREEN && <Tutorial onPlay={this.startGame} onSkip={this.goHome} />}
            </div>
        )
    }
}

export default App;