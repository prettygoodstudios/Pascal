import React, {Component} from 'react';

class Slot extends Component{

    constructor(props){
        super(props);
        const {id} = props;
        this.state = {
            id,
            selected: false
        }
    }

    componentDidMount(){
        window.addEventListener("mouseup", this.updateSlot);
    }

    updateSlot = () => {
        const {boxes, x, y} = this.props;
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
        const {x, y} = this.props;
        return(
            <div className="box" style={{top: y+"px", left: x+"px"}}>
                
            </div>
        )
    }
}

export default Slot;