import React, {Component} from "react";

class PauseGameMenu extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {points, startGame, goHome} = this.props;
        return(
            <div className="game-menu">
                <h1>Pascal</h1>
                <p>You currently have: {Intl.NumberFormat().format(points)} points!</p>
                <div className="game-menu__options">
                    <button onClick={startGame}>Resume</button>
                    <button onClick={goHome}>Main Menu</button>
                </div>
            </div>
        );
    }
}

export default PauseGameMenu;