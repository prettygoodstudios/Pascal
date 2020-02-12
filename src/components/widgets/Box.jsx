import React, {Component} from 'react';

class Box extends Component{

    constructor(props){
        super(props);
        const {x, y, value, id} = props;
        this.state = {
            x,
            y,
            value,
            id,
            selected: false
        }
    }

    componentDidMount(){
        const arena = document.querySelector(".game__arena");
        document.querySelector("#box"+this.state.id).addEventListener("mousedown", (e) => {
            this.setState({
                selected: true
            });
        });
        window.addEventListener("mousemove", (e) => {
            if(this.state.selected){
                this.setState({
                    x: e.clientX - arena.offsetLeft - 25,
                    y: e.clientY - arena.offsetTop - 25
                });
            }
        });
        document.querySelector("#box"+this.state.id).addEventListener("mouseup", (e) => {
            this.setState({
                selected: false
            });
        });
    }

    render(){
        const {value, x, y, id} = this.state;
        return(
            <div className="box" id={"box"+id} style={{top: y+"px", left: x+"px"}}>
                {value}
            </div>
        )
    }
}

export default Box;