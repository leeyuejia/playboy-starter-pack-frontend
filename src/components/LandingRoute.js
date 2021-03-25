import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  LandingPage,
  SignUpPage,
  DashboardPage,
  ProtectedRoute,
}
  from '../pages'
import GoogleSearch from './GoogleSearch';

class LandingRoute extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       profileImg :''
    }
  }
  
  render() {
    return (
      <Fragment>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/7/11" component={GoogleSearch}/>
              <ProtectedRoute path="/session" ><DashboardPage /></ProtectedRoute>
            </Switch>
          </div>
        </Router>
      </Fragment>
    )
  }
}
export default LandingRoute
