import React, {Component} from "react";
import Box from "../widgets/Box.jsx";
import Slot from "../widgets/Slot.jsx";
import { PAUSE_GAME } from "../../constants/gameStates.js";
import { generatePascalLayout } from "../../helpers/generatePascalLayout.js";
import { shuffle } from "../../helpers/shuffle.js";
import { getBoxLabel } from "../../helpers/getBoxLabel.js";
import { generatePascalTriangle } from "../../helpers/generatePascalTriangle.js";
import { AnimatedTypography } from "../widgets/AnimatedTypography.jsx";
import { getSlotToSnapTo } from "../../helpers/getSlotToSnapTo.js";

class Game extends Component {
    
    constructor(){
        super();
        this.state = {
            oldPoints: 0,
            points: 0,
            answer: [[], []],
            boxes: [],
            slots: [],
            arena: null,
            time: 30,
            round: 0,
            rounds: this.generateRoundPoool(),
            boxSize: 50,
            scoreUpdateAnimationDuration: 1_000,
            scoreUpdateVisible: false,
        }
    }

    componentDidMount(){
        const arena = document.querySelector(".game__arena");
        this.setState({
            arena
        });
        this.startChallenge(arena);
    }

    generateRoundPoool = () => {
        return shuffle(Array(7).fill(0).map((_, i) => i + 2));
    }

    getRound = () => {
        let { rounds } = this.state;

        if (rounds.length === 0) {
            rounds = this.generateRoundPoool();
            this.setState({ rounds });
        }

        return rounds.pop();
    }

    startChallenge = (arena) => {
        const { round } = this.state;

        const topRow = this.getRound();

        const rows = [
            generatePascalTriangle(topRow),
            generatePascalTriangle(topRow + 1),
        ];

        const standardBoxSize = 54;
        const boxSize = window.innerWidth > 450 ? standardBoxSize : Math.min((window.innerWidth - 40) / (topRow + 1), standardBoxSize);
        const slots = generatePascalLayout(topRow-1, topRow, boxSize, arena.clientWidth);
        const distance = window.innerHeight > 450 ? 200 : 150; 
        const boxes = slots.map((box) => ({...box, y: box.y + distance}));

        // Pick mystery boxes
        const flatRows = rows.flat();
        const mysteryBoxes = shuffle([...new Set(flatRows)]).slice(0, 2);
        mysteryBoxes.sort((a, b) => a-b);


        // Assign values
        shuffle(flatRows).forEach((boxValue, boxIndex) => {
            boxes[boxIndex].value = boxValue;
            boxes[boxIndex].visibleValue = getBoxLabel(boxValue, round, mysteryBoxes);
        });

        this.setState({
            answer: rows,
            boxes,
            slots,
            time: 30,
            boxSize
        });

        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.updateTime, 1000);
    }

    updateTime = () => {
        const {time, points} = this.state;
        if(this.props.gameState !== PAUSE_GAME){
            if(time - 1 == 0){
                this.props.endGame(points);
            } else {
                this.setState((prevState) => ({
                    time: prevState.time - 1
                }));
            }
        }
    }
    
    componentWillUnmount(){
        window.clearTimeout(this.scoreUpdateTimeout);
        window.clearInterval(this.timer);
    }

    setBoxPosition = (id, x, y) => {
        const {boxes} = this.state;
        const box = boxes[id];
        box.x = x;
        box.y = y;
        this.setState({
            boxes
        });
    }

    unSelectSlot = (boxId) => {
        const { slots } = this.state;
        for (const slot of slots) {
            if (slot.boxId === boxId) {
                Object.assign(slot, {
                    ...slot,
                    value: -1,
                    boxId: -1
                })
                return;
            }
        }
        
    }
    
    startNewRound = () => {
        const {boxes, arena, time, points, round, scoreUpdateAnimationDuration} = this.state;
        this.setState({
            points: points+boxes.length*50+time*50,
            round: round+1,
            oldPoints: points,
            scoreUpdateVisible: true,
        });
        this.scoreUpdateTimeout = setTimeout(() => this.setState({ scoreUpdateVisible: false }), scoreUpdateAnimationDuration);
        this.startChallenge(arena);
    }

    isSlotEmpty = (slot) => {
        return slot?.value === -1 || !('value' in slot);
    }

    snapBox = (boxId, slotId) => {
        const {boxes, slots, answer} = this.state;
        let box = boxes[boxId];
        const slot = slots[slotId];
        if(this.isSlotEmpty(slot)){
            box = {
                ...box,
                x: slot.x,
                y: slot.y
            }
            boxes[boxId] = box;
            slots[slotId] = {
                ...slot,
                value: box.value,
                boxId
            }
            const flattenedAnswer = [...answer[0], ...answer[1]];
            let correct = true;
            for(let i = 0; i < slots.length; i++){
                if(slots[i].value !== flattenedAnswer[i]){
                    correct = false;
                    break;
                }
            }
            if(!correct){
                this.setState({
                    boxes,
                    slots
                });
            }else{
                this.startNewRound();
            }
        }
    }

    onDrop = (box, boxId) => {
        const { slots, boxSize } = this.state;
        const { slotIndex } = getSlotToSnapTo(box, slots.map(s => ({...s, width: boxSize, height: boxSize })));

        if (slotIndex !== null) {
            this.snapBox(boxId, slotIndex);
        }
    }

    formatPoints = (value) => `Points: ${Intl.NumberFormat().format(value | 0)}`
    
    render(){
        const {points, boxes, slots, time, oldPoints, boxSize, scoreUpdateVisible, scoreUpdateAnimationDuration} = this.state;
        const {pauseGame, gameState} = this.props;

        return(
            <div className="game" style={{display: gameState == PAUSE_GAME ? "none" : "flex"}}>
                <div className="game__info">
                    <div className="vertically-centered">
                        <button className="game__pause" onClick={() => pauseGame(points)} title="Pause">
                            <span></span>
                            <span></span>
                        </button>
                        <h1 className="game__title">Pascal</h1>
                    </div>
                    <div className="game__stats">
                        <p className="game__time" role="timer">Time: {time}</p>
                        <AnimatedTypography
                            Component='p'
                            className="game__score"
                            from={oldPoints}
                            to={points}
                            format={this.formatPoints}
                            role="status"
                            delay={scoreUpdateAnimationDuration}
                        />
                    </div>
                </div>
                {scoreUpdateVisible && 
                    <p
                        className="game__scoreUpdate"
                        style={{ '--animationDuration': `${scoreUpdateAnimationDuration}ms`}}
                        role="presentation"
                    >+{Intl.NumberFormat().format(points - oldPoints)}</p>
                }
                <div className="game__arena">
                    {slots.map((s, i) => {
                        const {x, y} = s;
                        return <Slot x={x} y={y} id={i} key={i} size={boxSize}/>
                    })}
                    {boxes.map((b, i) => {
                        const {x, y, value, visibleValue} = b;
                        return (
                            <Box 
                                value={value}
                                x={x}
                                y={y}
                                setPosition={this.setBoxPosition}
                                id={i}
                                key={i}
                                visibleValue={visibleValue}
                                onDrop={this.onDrop}
                                size={boxSize}
                                onDragStart={this.unSelectSlot}
                                isSlotted={slots.map(s => s.boxId).includes(i)}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Game;