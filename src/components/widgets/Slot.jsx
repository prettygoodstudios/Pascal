import React, {Component} from 'react';


class Slot extends Component{


    render(){
        const {x, y, id} = this.props;
        return(
            <div className="box" id={"slot"+id} style={{transform: `translate(${x}px, ${y}px)`}} role="gridcell"></div>
        )
    }
}

export default Slot;