import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import GameContent from '../components/GameContent';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
             loadGame: false
        }
    }

    toggleGame = () => {
        this.setState({
            loadGame: !this.state.loadGame
        })
    }
    
    render() {
        return (
            <div className="game mt-5">
                <h1 className="font-weight-normal mb-3">So you think you are worthy of being called a Playboy?</h1>
                <p className="lead">
                    Just because you know some memes/gifs/puns doesn't automatically make you a Playboy.
                    <br />
                    <br />
                    Pass this test first and determine if you are worthy.
                </p>
                <MDBBtn color="pink" onClick={this.toggleGame}>Get Started</MDBBtn>
                {this.state.loadGame ? <GameContent /> : null}
            </div>
        )
    }
}

export default Game
