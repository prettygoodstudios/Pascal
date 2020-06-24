import React, {Component} from 'react';

import PWAPrompt from "../widgets/PWAPrompt.jsx";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.props.lockScroll();
    }

    render(){
        const {startGame, openHelp} = this.props;
        return(
            <div className="home-screen">
                <div className="home-screen__title-section">
                    <h1 className="home-screen__title">Pascal</h1>
                    <button className="home-screen__play-button" onClick={startGame}>Play</button>
                </div>
                <button className="home-screen__help-button" onClick={openHelp}>?</button>
                <PWAPrompt />
            </div>
        )
    }
}

export default Home;