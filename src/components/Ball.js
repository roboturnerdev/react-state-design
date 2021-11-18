import React, { Component } from 'react';
import './Ball.css';

class Ball extends Component {
    // no need for constructor as this is a stateless component
    render() {
        return (
            <div className="Ball">{this.props.num}</div>
        );
    }
}

export default Ball;