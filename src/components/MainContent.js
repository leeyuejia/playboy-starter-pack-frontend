import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  LandingPage,
  SignUpPage,
  UserDashboardPage,
  DashboardPage,
  GifsPage,
  MemesPage,
  PunsPage,
  NewMeme,
  NewGif,
  NewPun,
  EditProfilePage
}
  from '../pages'
  import api from '../api';

class MainContent extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       profileImg :''
    }
  }
//   componentDidMount = async () => {
//     try {
//         const response = await api.getUser();
//         console.log(response.data)
//         this.setState({
//             username: response.data.username,
//             profileImg: response.data.profileImg,
//             profileBio: response.data.profileBio,
//             authenticated: true
//         })
//     } catch (err) {
//         console.log(err)
//         this.setState({
//             authenticated: false
//         })
//     }
// }
  
  render() {
    return (
      <Fragment>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/signup" exact component={SignUpPage} />
              <Route path="/profile" exact component={UserDashboardPage} />
              <Route path='/dashboard' exact component={DashboardPage} />
              <Route path="/gifs" exact component={GifsPage} />
              <Route path="/memes" exact component={MemesPage} />
              <Route path="/puns" exact component={PunsPage} />
              <Route path="/new/meme" exact component={NewMeme} />
              <Route path="/new/pun" exact component={NewPun} />
              <Route path="/new/gif" exact component={NewGif} />
            </Switch>
          </div>
        </Router>
      </Fragment>
    )
  }
}


export default MainContent
