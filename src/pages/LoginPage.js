import React, { Component } from 'react'
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle, MDBCardText
}
    from 'mdbreact';

import api from '../api';

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginUsername: '',
            loginPassword: '',
            islogout: false
        }
    }
    // call the backend to authenticate
    // if authed, redirect to dashboard page. 

    signOut = () => {
        localStorage.removeItem("token");
        this.setState({
          islogout: true
        });
      };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // redirecting = () => {
    //     if (this.state.loginSuccess) return <Redirect to='/session/dashboard' />
    //     else return false
    // }

    login = async event => {
        event.preventDefault();
        try {
            const payload = {
                username: this.state.loginUsername,
                password: this.state.loginPassword
            }
            console.log(payload)
            await api.loginUser(payload);
            this.setState({
                loginUsername: '',
                loginPassword: '',
                loginSuccess: true
            })
            await localStorage.setItem("token", "T");
            // await this.redirecting();
            window.location.href='/session/dashboard';
        } catch(err) {
            this.setState({
                error: true
            })
        }
    }

    render() {           
        return (
            <div className='landingPage'>
                <MDBContainer >
                    {/* {this.redirecting()} */}
                    <MDBCol style={{ maxWidth: "35rem" }}>
                        <form onSubmit={this.login}>
                            <MDBCard>
                                <MDBCardTitle className='m-3' style={{ Width: '95%', margin: '0 auto' }}>
                                    Welcome to playboy club!
                                    {this.state.error? <h4>Either wrong password / username</h4> : null}
                            </MDBCardTitle>
                                <MDBCardBody>
                                        <MDBInput label='username'
                                            type='text'
                                            name='loginUsername'
                                            value={this.state.loginUsername}
                                            onChange={this.handleChange}
                                            required />
                                        <MDBInput label='password'
                                            type='password'
                                            name='loginPassword'
                                            value={this.state.loginPassword}
                                            onChange={this.handleChange}
                                            required />
                                        <div className='cardbottom'>
                                            <MDBBtn type='submit'>Sign in</MDBBtn>
                                            <MDBCardText className='my-2'>Or</MDBCardText>
                                            <MDBBtn href='/signup' style={{ textDecoration:'none' }}>Sign up</MDBBtn>
                                            <MDBBtn href='/7/11' style={{ textDecoration:'none' }}>Go to 7/11 for GoogleSearch</MDBBtn>
                                        </div>
                                </MDBCardBody>
                            </MDBCard>
                        </form>
                    </MDBCol>
                </MDBContainer>
            </div>
        )
    }
}

export default LandingPage