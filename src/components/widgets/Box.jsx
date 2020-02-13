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
        const arena = document.querySelector(".game__arena");
        this.props.setPosition(this.state.id, this.state.x, this.state.y);
        document.querySelector("#box"+this.state.id).addEventListener("mousedown", (e) => {
            this.setState({
                selected: true
            });
        });
        window.addEventListener("mousemove", (e) => {
            if(this.state.selected){
                const x = e.clientX - arena.offsetLeft - 25;
                const y = e.clientY - arena.offsetTop - 25;
                this.props.setPosition(this.state.id, x, y);
            }
        });
        window.addEventListener("mouseup", (e) => {
            this.setState({
                selected: false
            });
        });
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