import React, {Component} from "react";
import { AnimatedTypography } from "../widgets/AnimatedTypography.jsx";

class EndGameMenu extends Component {
    constructor(props){
        super(props);
    }

    formatPoints = (value) => `You earned: ${Intl.NumberFormat().format(value|0)} points!`

    render(){
        const {points, startGame, goHome} = this.props;
        return(
            <div className="game-menu">
                <h1>Pascal</h1>
                <AnimatedTypography
                    Component='p'
                    format={this.formatPoints}
                    delay={0}
                    duration={1_000}
                    from={0}
                    to={points}
                />
                <div className="game-menu__options">
                    <button onClick={startGame}>Play Again</button>
                    <button onClick={goHome}>Main Menu</button>
                </div>
            </div>
        );
    }
}

export default EndGameMenu;