import React, {Component} from 'react';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
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
            </div>
        )
    }
}

export default Home;