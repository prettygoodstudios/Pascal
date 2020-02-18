import React, {Component} from 'react';

import {getPointerPosition} from '../../helpers/input';

class Slot extends Component{

    componentDidMount(){
        this.upHanlder = window.addEventListener("mouseup", this.updateSlot);
        this.downHandler = window.addEventListener("mousedown", this.clearSlot);
        this.touchStartHandler = window.addEventListener("touchend", this.updateSlot);
        this.touchEndHandler = window.addEventListener("touchstart", this.clearSlot);
    }

    componentWillUnmount(){
        window.removeEventListener("mouseup", this.updateSlot);
        window.removeEventListener("mousedown", this.clearSlot);
        window.removeEventListener("touchend", this.updateSlot);
        window.removeEventListener("touchstart", this.clearSlot);
    }

    updateSlot = () => {
        const {boxes, x, y, snapBox, id} = this.props;
        boxes.forEach((b, i) => {
            if(b.x > x-20 && b.x+50 < x+70 && b.y > y-20 && b.y+50 < y+70){
                snapBox(i, id);
            }
        });
    }

    clearSlot = (e) => {
        const {id, unSelectSlot} = this.props;
        const element = document.getElementById("slot"+id);
        const rect = element.getBoundingClientRect();
        const {clientX, clientY} = getPointerPosition(e);

        if(clientX > rect.left && clientX < rect.right && clientY > rect.top && clientY < rect.bottom){
            unSelectSlot(id);
        }
    }


    render(){
        const {x, y, id} = this.props;
        return(
            <div className="box" id={"slot"+id} style={{top: y+"px", left: x+"px"}}></div>
        )
    }
}

export default Slot;