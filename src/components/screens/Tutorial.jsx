import React, { useCallback, useState } from "react";
import { PascalTriangleAnimation } from "../widgets/PascalTriangleAnimation.jsx";

const stateMachine = {
    pascal: {
        name: 'pascal',
    },
    welcome: {
        name: 'welcome',
    },
    skip: {
        name: 'skip',
    },
    explanation: {
        name: 'explanation',
    },
    pain: {
        name: 'pain',
    },
    examples: {
        name: 'examples',
    },
    coefficients: {
        name: 'coefficients',
    },
    pattern: {
        name: 'pattern',
    },
    showAgain: {
        name: 'showAgain',
    },
    reveal: {
        name: 'reveal',
    }
}

const ShowOnState = ({state, selectedState, children}) => {
    return (
        <div style={{opacity: state === selectedState ? 1 : 0, pointerEvents: state === selectedState ? 'all' : 'none' }} className="Tutorial__state fade">
            {children}
        </div>
    )
}

export const Tutorial = () => {
    const [state, setState] = useState(stateMachine.pascal.name);

    const onPascalTrianlgeAnimationFinish = useCallback(() => {
        setState(stateMachine.welcome.name);
        setTimeout(() => setState(stateMachine.skip.name), 1000);
    }, []);

    const onShowAgainFinish = useCallback(() => {
        setState(stateMachine.reveal.name);
    }, []);

    return (
        <div>
            <ShowOnState state={stateMachine.pascal.name} selectedState={state}>
                <div className="TutorialPascalTriangleAnimation">
                    <PascalTriangleAnimation onFinish={onPascalTrianlgeAnimationFinish}/>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.welcome.name} selectedState={state}>
                <h2 className="Tutorial__welcome">Welcome to Pascal!</h2>
            </ShowOnState>
            <ShowOnState state={stateMachine.skip.name} selectedState={state}>
                <div className="Tutorial__skip">
                    <button className="Tutorial__button--primary">Continue Tutorial</button><button className="Tutorial__button--secondary">Skip</button>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.skip.name} selectedState={state}>
                <div className="Tutorial__skip">
                    <button 
                        className="Tutorial__button--primary"
                        onClick={() => {
                            setState(stateMachine.explanation.name);
                            setTimeout(() => setState(stateMachine.pain.name), 2000);
                            setTimeout(() => setState(stateMachine.examples.name), 4000);
                            setTimeout(() => setState(stateMachine.coefficients.name), 11000);
                            setTimeout(() => setState(stateMachine.pattern.name), 14000);
                            setTimeout(() => setState(stateMachine.showAgain.name), 17000);
                        }}
                    >
                        Continue Tutorial
                    </button>
                    <button className="Tutorial__button--secondary">Skip</button>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.explanation.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Have you ever tried expanding something like <var>(x + y)<sup>5</sup></var> ?</p>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.pain.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>It can be a real pain, if you don't know the trick</p>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.examples.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Let's look at some similar examples</p>
                   <div className="Tutorial__examples">
                    <p><var>(x + y)<sup>0</sup>=</var></p><p><var><span>1</span></var></p>
                    <p><var>(x + y)<sup>1</sup>=</var></p><p><var><span>1</span>x+<span>1</span>y</var></p>
                    <p><var>(x + y)<sup>2</sup>=</var></p><p><var><span>1</span>x<sup>2</sup>+<span>2</span>xy+<span>1</span>y<sup>2</sup></var></p>
                    <p><var>(x + y)<sup>3</sup>=</var></p><p><var><span>1</span>x<sup>3</sup>+<span>3</span>x<sup>2</sup>y+<span>3</span>xy<sup>2</sup>+<span>1</span>y<sup>3</sup></var></p>
                   </div>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.coefficients.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Did you notice that the coefficients form the triangle we saw earlier on?</p>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.pattern.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Let's show the triangle again, and see if you can spot the pattern?</p>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.showAgain.name} selectedState={state}>
                <div className="TutorialPascalTriangleAnimation">
                    <PascalTriangleAnimation onFinish={onShowAgainFinish}/>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.reveal.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Each element of the triangle is the sum of its two neighbor above</p>
                </div>
            </ShowOnState>
        </div>
    )
}
