import React, { Component } from 'react'

class GameContent extends Component {
    render() {
        return (
            <div className="mt-4">
                <h4 className="mb-4 mt-4">Alright.. up your game now by picking up girls.</h4>
                <p className="lead">The rules are simple.</p>
                <p className="lead" style={{ color:'#633974'}}><strong>1. Pick up 3 girls or more within 1 hour to prove your worthiness</strong></p>
                <p className="lead" style={{ color:'#633974'}}><strong>2. Anything below 3 girls and you are not worthy</strong></p>
            </div>
        )
    }
}

export default GameContent
