import React, {Component} from "react";
import Prompt from "./Prompt.jsx";

export default class PWAPrompt extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: true,
            deferredPrompt: null
        }
    }

    componentDidMount(){

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            // Update UI notify the user they can install the PWA
            this.setState({
                show: true,
                deferredPrompt: e
            });
        });
    }

    render(){
        return(
            <Prompt show={this.state.show} dismiss={() => this.setState({show: false})}>
                <h3>Install Now</h3>
                <a>Download</a>
            </Prompt>
        )
    }

}