import React, {Component} from 'react';

class Slot extends Component{

    constructor(props){
        super(props);
        const {x, y, id} = props;
        this.state = {
            x,
            y,
            id,
            selected: false
        }
    }

    componentDidMount(){
        window.addEventListener("mouseup", this.updateSlot);
    }

    updateSlot = () => {
        const {boxes} = this.props;
        const {x, y, id} = this.state;
        let selected = false;
        boxes.forEach((b) => {
            if(b.x > x-20 && b.x+50 < x+70 && b.y > y-20 && b.y+50 < y+70){
                console.log("Selected")
                selected = true;
            }
        });
        this.setState({
            selected
        });
    }

    render(){
        const {x, y, selected} = this.state;
        return(
            <div className="box" style={{top: y+"px", left: x+"px"}}>
                
            </div>
        )
    }
}

export default Slot;