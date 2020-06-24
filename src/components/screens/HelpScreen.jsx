import React, {Component} from "react";


class HelpScreen extends Component {

    componentDidMount(){
        this.props.unlockScroll();
    }

    render(){
        const {goHome} = this.props;
        return(
            <div className="help-screen">
                <h1>Pascal</h1>
                <p>Pascal is an educational math game where the player constructs two rows of the pascal triangle. The elements from the two rows are randomly shuffled at the bottom of the screen. The elements can be dragged into their respective places on the grid found above. All edge elements have a value of "1" in the pascal triangle. The value of an element equals the value of its two neighbors that are directly above it, if it is not on the edge. At the top right of the screen, there is a countdown timer. The player has 30 seconds to complete each round. After a certain point in the game, elements will apear with a "?". These elements all have the same value, but can have the value of any element found in the two rows. After several rounds with "?" elements, elements with "a" and "b" will appear. Elements that contain an "a" can be any element found in the two rows. All "a" elements have the same value. Elements that contain a "b" can be any element found in the two rows. All "b" elements have the same value. The value of "b" elements are always greater than the value of "a" elements.</p>
                <button onClick={goHome}>Go Home</button>
            </div>
        );
    }
}

export default HelpScreen;