import React, { Component } from 'react'
import NavBar from '../navBar'


export class NewPun extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <NavBar/>
                <h1>create new pun</h1>
            </div>
        )
    }
}

export default NewPun