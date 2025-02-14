import React, {Component} from 'react';

import {getPointerPosition} from '../../helpers/input';

class Slot extends Component{


    render(){
        const {x, y, id} = this.props;
        return(
            <div className="box" id={"slot"+id} style={{top: y+"px", left: x+"px"}}></div>
        )
    }
}

export default Slot;