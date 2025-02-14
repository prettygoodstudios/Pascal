import React, {Component} from 'react';

import {getPointerPosition} from '../../helpers/input'; 

class Box extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
    }

    componentDidMount(){
        const {id, x, y} = this.props;
        this.props.setPosition(id, x, y);
        this.selectHandler = document.querySelector("#box"+id).addEventListener("mousedown", this.select);
        this.moveHandler = window.addEventListener("mousemove", this.handleMouseMove);
        this.unSelectHandler = window.addEventListener("mouseup", this.unSelect);
        this.dragHandler = window.addEventListener("touchmove", this.handleMouseMove);
        this.touchStartHandler = document.querySelector("#box"+id).addEventListener("touchstart", this.select);
        this.touchEndHandler = window.addEventListener("touchend", this.unSelect);
    }

    select = () => {
        const { id, onDragStart } = this.props;
        onDragStart(id);
        this.setState({
            selected: true
        });
    }

    unSelect = () => {
        const { selected } = this.state;
        const { id, x, y, onDrop } = this.props;
        if (selected) {
            onDrop({ x, y, width: 54, height: 54 }, id);
        }
        this.setState({
            selected: false
        });
    }

    handleMouseMove = (e) => {
        const {id} = this.props;
        const {clientX, clientY} = getPointerPosition(e);
        if(this.state.selected){
            const arena = document.querySelector(".game__arena");
            const x = clientX - arena.offsetLeft - 25;
            const y = clientY - arena.offsetTop - 25;
            this.props.setPosition(id, x, y);
        }
    }

    componentWillUnmount(){
        document.querySelector("#box"+this.props.id).removeEventListener("mousedown", this.select);
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.unSelect);
        window.removeEventListener("touchmove", this.handleMouseMove);
        window.removeEventListener("touchend", this.unSelect);
        document.querySelector("#box"+this.props.id).removeEventListener("touchstart", this.select);
    }

    render(){
        const {x, y, id, visibleValue, isSlotted} = this.props;
        const { selected } = this.state;
        const getZIndex = () => {
            if (isSlotted) {
                return 0;
            }
            return selected ? 2 : 1;
        }
        return(
            <div className="box" id={"box"+id} style={{transform: `translate(${x}px, ${y}px)`, cursor: 'move', zIndex: getZIndex()}} draggable onDrag={e => e.preventDefault()} onDragStart={e => e.preventDefault()}>
                {visibleValue}
            </div>
        )
    }
}

export default Box;