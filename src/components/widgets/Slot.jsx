import React, {Component} from 'react';


class Slot extends Component{


    render(){
        const {x, y, size} = this.props;
        return(
            <div className="box" style={{transform: `translate(${x}px, ${y}px)`, '--size': size}} role="gridcell"></div>
        )
    }
}

export default Slot;