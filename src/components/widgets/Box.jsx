import React, {Component} from 'react';

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
        const {id} = this.props;
        if(this.state.selected){
            const arena = document.querySelector(".game__arena");
            const x = e.clientX - arena.offsetLeft - 25;
            const y = e.clientY - arena.offsetTop - 25;
            this.props.setPosition(id, x, y);
        }
    }

    componentWillUnmount(){
        document.querySelector("#box"+this.props.id).removeEventListener("mousedown", this.select);
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.unSelect);
    }

    render(){
        const {x, y, value, id} = this.props;

        return(
            <div className="box" id={"box"+id} style={{top: y+"px", left: x+"px"}}>
                {value}
            </div>
        )
    }
}

export default Box;