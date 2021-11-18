import React, { Component } from 'react';
import Ball from './Ball';
import './Lottery.css';

class Lottery extends Component {
    static defaultProps = {
        title: 'Lotto',
        numBalls: 6,
        maxNum: 40
    }
    constructor(props) {
        super(props);
        this.state= {nums: Array.from({length: this.props.numBalls })}; // makes array that long still empty
        this.handleClick = this.handleClick.bind(this);
    }
    generate() { // building a new array from scratch, then setting state to the new array.
        this.setState(curState => ({ // set the state where we take the currentState and . . .
            nums: curState.nums.map( // assigning the currentStates nums array to A NEW ARRAY RETURNED FROM MAP
                n => Math.floor(Math.random() * this.props.maxNum) + 1 // where inside we fill it length times with
            )   // random numbers between 1 and the maxNumber
        }));
    }
    handleClick() {
        this.generate();    // pattern, choice about style. event handler called handleThis...calls other specific code.
    }
    render() {
        return(
            <section className="Lottery">
                <h1>{this.props.title}</h1>
                <div>
                    {this.state.nums.map(n => <Ball num={n} />)}
                </div>
                <button onClick={this.handleClick}>Generate New Numbers</button>
            </section>
        )
    }
}

export default Lottery;