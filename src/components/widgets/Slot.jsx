import React, {Component} from 'react';


class Slot extends Component{


    render(){
        const {x, y, id, size} = this.props;
        return(
            <div className="box" id={"slot"+id} style={{transform: `translate(${x}px, ${y}px)`, '--size': size}} role="gridcell"></div>
        )
    }
}

export default Slot;