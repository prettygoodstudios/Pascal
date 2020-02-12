import React, {Component} from 'react';


class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <div className="home-screen">
                <div className="home-screen__title-section">
                    <h1 className="home-screen__title">Pascal</h1>
                    <button className="home-screen__play-button">Play</button>
                </div>
            </div>
        )
    }
}

export default Home;