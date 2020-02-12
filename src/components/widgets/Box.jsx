import React, {Component} from 'react';

class Box extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            value: props.value
        }
    }

    componentDidMount(){
    
    }

    render(){
        const {value, x, y} = this.state;
        return(
            <div className="box" style={{top: y, left: x}}>
                {value}
            </div>
        )
    }
}

export default Box;