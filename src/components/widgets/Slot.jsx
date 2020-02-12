import React, {Component} from 'react';

class Box extends Component{

    constructor(props){
        super(props);
        const {x, y, id} = props;
        this.state = {
            x,
            y,
            id
        }
    }

    componentDidMount(){
        
    }

    render(){
        const {x, y, id} = this.state;
        return(
            <div className="box" style={{top: y+"px", left: x+"px"}}>
                
            </div>
        )
    }
}

export default Box;