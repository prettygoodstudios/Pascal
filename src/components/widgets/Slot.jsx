import React, {Component} from 'react';

class Slot extends Component{

    componentDidMount(){
        this.upHanlder = window.addEventListener("mouseup", this.updateSlot);
        this.downHandler = window.addEventListener("mousedown", this.clearSlot);
    }

    componentWillUnmount(){
        window.removeEventListener("mouseup", this.upHanlder);
        window.removeEventListener("mousedown", this.downHandler);
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
        if(e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom){
            unSelectSlot(id);
        }
    }


    render(){
        const {x, y, id} = this.props;
        return(
            <div className="box" id={"slot"+id} style={{top: y+"px", left: x+"px"}}>
                
            </div>
        )
    }
}

export default Slot;