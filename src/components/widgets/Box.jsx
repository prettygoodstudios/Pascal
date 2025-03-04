import React, {Component} from 'react';

import {getPointerPosition} from '../../helpers/input';

/**
 * @param {Event} e 
 */
function preventDefault(e) {
    e.preventDefault();
}

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
        this.moveHandler = window.addEventListener("mousemove", this.handleMouseMove);
        this.unSelectHandler = window.addEventListener("mouseup", this.unSelect);
        this.dragHandler = window.addEventListener("touchmove", this.handleMouseMove);
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
        const { id, x, y, onDrop, size } = this.props;
        if (selected) {
            onDrop({ x, y, width: size, height: size }, id);
            this.setState({
                selected: false
            });
        }
    }

    handleMouseMove = (e) => {
        const {id, size, arenaSelector = '.game__arena' } = this.props;
        const {selected} = this.state;
        const {clientX, clientY} = getPointerPosition(e);
        if(selected){
            const arena = document.querySelector(arenaSelector);
            const x = clientX - arena.offsetLeft - size / 2;
            const y = clientY - arena.offsetTop - size / 2;
            this.props.setPosition(id, x, y);
        }
    }

    componentWillUnmount(){
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.unSelect);
        window.removeEventListener("touchmove", this.handleMouseMove);
        window.removeEventListener("touchend", this.unSelect);
    }

    render(){
        const {x, y, visibleValue, isSlotted, size} = this.props;
        const { selected } = this.state;
        const getZIndex = () => {
            if (isSlotted) {
                return 0;
            }
            return selected ? 2 : 1;
        }
        return(
            <div className="box" onMouseDown={this.select} onTouchStart={this.select} style={{transform: `translate(${x}px, ${y}px)`, cursor: 'move', zIndex: getZIndex(), '--size': size, '--fontSize': size > 45 ? '1.5rem' : '1rem'}} draggable role="application" onDrag={preventDefault} onDragStart={preventDefault}>
                {visibleValue}
            </div>
        )
    }
}

export default Box;