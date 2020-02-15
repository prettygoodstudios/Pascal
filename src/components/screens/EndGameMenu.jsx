import React, {Component} from "react";

class EndGameMenu extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {points, startGame, goHome} = this.props;
        return(
            <div className="game-menu">
                <h1>Pascal</h1>
                <p>You earned: {points} points!</p>
                <div className="game-menu__options">
                    <button onClick={startGame}>Play Again</button>
                    <button onClick={goHome}>Main Menu</button>
                </div>
            </div>
        );
    }
}

export default EndGameMenu;