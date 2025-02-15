import React, {Component} from "react";


export default class Prompt extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const {show, children, dismiss} = this.props;

        if(!show){
            return <div></div>;
        }
        return(
            <div className="prompt">
                <div className="prompt__header">
                    <button className="prompt__header__dismiss" onClick={dismiss} title='Dismiss prompt'>
                        <div></div>
                        <div></div>
                    </button>
                </div>
                {children}
            </div>
        );
    }


}