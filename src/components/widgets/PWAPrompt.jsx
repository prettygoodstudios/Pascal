import React, {Component} from "react";
import Prompt from "./Prompt.jsx";

export default class PWAPrompt extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
            deferredPrompt: null,
            allreadyClicked: false
        }
    }

    componentDidMount() {
        window.addEventListener('beforeinstallprompt', this.onBeforeInstall);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeinstallprompt', this.onBeforeInstall);
    }

    onBeforeInstall = (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Check to see if the prompt has been previously denied
        if(!localStorage.getItem("promptActivated")){
            // Stash the event so it can be triggered later.
            // Update UI notify the user they can install the PWA
            this.setState({
                show: true,
                deferredPrompt: e
            });
        }
    }

    download = () => {
        this.state.deferredPrompt.prompt(); 
        this.state.deferredPrompt.userChoice.then(() => {
            localStorage.setItem("promptActivated", "true");
        });
        this.setState({
            deferredPrompt: null,
            show: false
        });
    }

    render(){
        return(
            <Prompt show={this.state.show} dismiss={() => this.setState({show: false})}>
                <h3>Install Now</h3>
                <button className="prompt__download" onClick={this.download}>Download</button>
            </Prompt>
        )
    }

}