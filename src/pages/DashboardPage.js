import React, { Component } from 'react'
import Features from '../components/Features.js'
import NavBar from '../components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    UserDashboardPage,
    GifsPage,
    MemesPage,
    PunsPage,
    NewMeme,
    NewGif,
    NewPun,
    GamePage,
    EditMemePage,
    EditGifPage,
    EditPunPage
}
    from '.'

import api from '../api'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getUser();
            this.setState({
                userId: response.data._id,
                username: response.data.username,
                profileImg: response.data.profileImg,
                profileBio: response.data.profileBio,
                authenticated: true
            })
            console.log(response)
        } catch (err) {
            console.log(err)
            this.setState({
                authenticated: false
            })
        }
    }

    renderSignIn = () => {
        window.location.href = '/'
    }

    render() {
        return (
            <Router>
                {/* <Header /> */}
                <NavBar />
                <Switch>
                    <Route path="/session/dashboard" exact component={Features} />
                    <Route path="/session/profile/:username" component={UserDashboardPage} />
                    <Route path="/session/gifs"
                        render={
                            (props) =>
                                <GifsPage {...props} username={this.state.username} />
                        }
                    />
                    <Route path="/session/memes"
                        render={
                            (props) =>
                                <MemesPage {...props} username={this.state.username} />
                        }
                    />
                    <Route path="/session/puns"
                        render={
                            (props) =>
                                <PunsPage {...props} username={this.state.username} />
                        }
                    />
                    <Route path="/session/new/meme" component={NewMeme} />
                    <Route path="/session/new/pun" component={NewPun} />
                    <Route path="/session/new/gif" component={NewGif} />
                    <Route path="/session/game" component={GamePage} />
                    <Route path="/session/edit/meme/:id" component={EditMemePage} />
                    <Route path="/session/edit/gif/:id" component={EditGifPage} />
                    <Route path="/session/edit/pun/:id" component={EditPunPage} />
                </Switch>
                {/* first time NavBar is rendered */}
            </Router>
        )
    }
}

export default DashboardPage
