import React, {Component} from 'react';

class Box extends Component{

    constructor(props){
        super(props);
        const {value, id} = props;
        this.state = {
            value,
            id,
            selected: false
        }
    }

    componentDidMount(){
        this.props.setPosition(this.state.id, this.state.x, this.state.y);
        this.selectHandler = document.querySelector("#box"+this.state.id).addEventListener("mousedown", this.select);
        this.moveHandler = window.addEventListener("mousemove", this.handleMouseMove);
        this.unSelectHandler = window.addEventListener("mouseup", this.unSelect);
    }

    select = () => {
        this.setState({
            selected: true
        });
    }

    unSelect = () => {
        this.setState({
            selected: false
        });
    }

    handleMouseMove = (e) => {
        if(this.state.selected){
            const arena = document.querySelector(".game__arena");
            const x = e.clientX - arena.offsetLeft - 25;
            const y = e.clientY - arena.offsetTop - 25;
            this.props.setPosition(this.state.id, x, y);
        }
    }

    componentWillUnmount(){
        document.querySelector("#box"+this.state.id).removeEventListener("mousedown", this.selectHandler);
        window.removeEventListener("mousemove", this.moveHandler);
        window.removeEventListener("mouseup", this.unSelectHandler);
    }

    render(){
        const {value, id} = this.state;
        const {x, y} = this.props;
        return(
            <div className="box" id={"box"+id} style={{top: y+"px", left: x+"px"}}>
                {value}
            </div>
        )
    }
}

export default Box;