import React, {Component} from 'react';

import Home from "./screens/Home.jsx";

class App extends Component{

    constructor(){
        super();
    }

    componentDidMount(){
        console.log("Hello")
    }

    render(){
        return(
            <div>
                <Home />
            </div>
        )
    }
}

export default App;