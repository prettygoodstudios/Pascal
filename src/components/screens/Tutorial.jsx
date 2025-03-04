import React, { useCallback, useEffect, useState } from "react";
import { PascalTriangleAnimation } from "../widgets/PascalTriangleAnimation.jsx";
import { PracticeRound } from "../widgets/PracticeRound.jsx";
import { classNames } from "../../helpers/classNames.js";

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
    },
    try: {
        name: 'try',
    },
    practice: {
        name: 'practice',
    },
    congrats: {
        name: 'congrats',
    }
}

const ShowOnState = ({state, selectedState, children}) => {
    const duration = 1_000;
    const isVisible = state === selectedState;

    const [visibility, setVisibility] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setVisibility(isVisible);
        } else {
            const timeout = setTimeout(() => setVisibility(isVisible), duration);
            return () => clearTimeout(timeout);
        }
    }, [isVisible]);

    if (!visibility) {
        return null;
    }

    return (
        <div className={classNames({
            'Tutorial__state': true,
            'fade-in': isVisible,
            'fade-out': !isVisible,
        })}>
            {children}
        </div>
    )
}

export const Tutorial = ({onPlay, onSkip}) => {
    const [state, setState] = useState(stateMachine.pascal.name);

    const onPascalTrianlgeAnimationFinish = useCallback(() => {
        setState(stateMachine.welcome.name);
        setTimeout(() => setState(stateMachine.skip.name), 1000);
    }, []);

    const onShowAgainFinish = useCallback(() => {
        setState(stateMachine.reveal.name);
        setTimeout(() => setState(stateMachine.try.name), 2000);
        setTimeout(() => setState(stateMachine.practice.name), 4000);
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
                    <button 
                        className="Tutorial__button--primary"
                        onClick={() => {
                            setState(stateMachine.explanation.name);
                            setTimeout(() => {
                                setState(stateMachine.pain.name);
                            }, 2000);
                            setTimeout(() => {
                                setState(stateMachine.examples.name);
                            }, 4000);
                        }}
                    >
                        Continue Tutorial
                    </button>
                    <button className="Tutorial__button--secondary" onClick={onSkip}>Skip</button>
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
                   <button 
                        className="Tutorial__button--primary"
                        onClick={() => {
                            setState(stateMachine.coefficients.name);
                            setTimeout(() => setState(stateMachine.pattern.name), 2000);
                            setTimeout(() => setState(stateMachine.showAgain.name), 4000);
                        }}
                    >
                        Got it!
                    </button>
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
                   <p>Each element of the triangle is the sum of its two neighbors above</p>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.try.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Now give it a try</p>
                </div>
            </ShowOnState>
            <ShowOnState state={stateMachine.practice.name} selectedState={state}>
                <PracticeRound
                    onFinish={() => {
                        setState(stateMachine.congrats.name);
                        setTimeout(() => onPlay(), 3000);
                    }}
                />
            </ShowOnState>
            <ShowOnState state={stateMachine.congrats.name} selectedState={state}>
                <div className="Tutorial__explanation">
                   <p>Congrats you now got what it takes to play for real!</p>
                </div>
            </ShowOnState>
        </div>
    )
}
