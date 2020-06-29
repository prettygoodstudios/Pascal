import React, {Component} from "react";


export default class Prompt extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const {show, children, dismiss} = this.props;
        console.log(show);
        if(!show){
            return <div></div>;
        }
        return(
            <div className="prompt">
                <div className="prompt__header">
                    <div className="prompt__header__dismiss" onClick={dismiss}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                {children}
            </div>
        );
    }


}