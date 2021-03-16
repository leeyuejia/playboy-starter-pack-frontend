import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput,
    MDBCol,MDBCard, MDBCardBody,
    MDBCardTitle, MDBAlert } 
from 'mdbreact';

import api from '../api';

class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerUsername: '',
            registerPassword: '',
            registerPassword2: '', // Confirmation password
            registerEmail: '',
            registerProfileImg: '',
            registerProfileBio: '',
            registerSuccess: false,
            islogged: false,
            usernameError: false,
            emailError: false,
            passwordError: false
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    redirecting = () => { // adding a function to redirect
        if (this.state.registerSuccess) {
            return <Redirect to='/' />
        } else return false
    }

    register = async event => {
        event.preventDefault();
        console.log('this.state is: ', this.state)
        
        try {
            const payload = {
                username: this.state.registerUsername,
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                profileImg: this.state.registerProfileImg,
                profileBio: this.state.registerProfileBio,
            }
            const response = await api.registerUser(payload);
            console.log(response.data)
            if (this.state.registerPassword !== this.state.registerPassword2) {
                this.setState({
                    passwordError: true,
                    passwordErrorMsg: 'Password do not match'
                })
            } else {
                this.setState({
                    passwordError: false
                })
            }

            if (this.state.registerUsername === response.data.username) {
                this.setState({
                    usernameError: true,
                    usernameErrorMsg: 'Username already exist'
                })
            } else {
                this.setState({
                    usernameError: false
                })
            }

            if (this.state.registerEmail === response.data.email) {
                this.setState({
                    emailError: true,
                    emailErrorMsg: 'Email already exist'
                })
            } else {
                this.setState({
                    emailError: false
                })
            }

            if (!this.state.usernameError && !this.state.emailError && !this.state.passwordError) {
                this.setState({
                    registerUsername: '',
                    registerPassword: '',
                    registerPassword2: '', // Confirmation password
                    registerEmail: '',
                    registerProfileImg: '',
                    registerSuccess: true, // adding a function to redirect
                    islogged: true
                })
                console.log('registered');
                await this.redirecting();
            }
        } catch (err) {
            console.log(err)
            this.setState({
                error: true
            })
        }
    }

    render() {
        return (
            <div className='landingPage'>
                <MDBContainer>
                    {this.redirecting()}
                    <MDBCol style={{ maxWidth: "35rem" }}>
                        <MDBCard>
                            <MDBCardTitle className='mt-4 mb-0'>
                                <strong>Registration</strong>
                            </MDBCardTitle>
                                <div className="gcse-search"></div>
                            {this.state.usernameError ? <MDBAlert className="mr-3 ml-3" color="warning">
                                {this.state.usernameErrorMsg}
                            </MDBAlert> : null}
                            {this.state.emailError ? <MDBAlert className="mr-3 ml-3" color="warning">
                                {this.state.emailErrorMsg}
                            </MDBAlert> : null}
                            {this.state.passwordError ? <MDBAlert className="mr-3 ml-3" color="warning">
                                {this.state.passwordErrorMsg}
                            </MDBAlert> : null}
                            <MDBCardBody>
                                <form onSubmit={this.register}>
                                    <MDBInput label='username'
                                        type='text'
                                        name='registerUsername'
                                        value={this.state.registerUsername}
                                        onChange={this.handleChange}
                                        required>
                                    </MDBInput>
                                    {/* {this.state.usernameError ? <small>{this.state.usernameErrorMsg}</small> : null} */}
                                    <MDBInput label='email'
                                        type='email'
                                        name='registerEmail'
                                        value={this.state.registerEmail}
                                        onChange={this.handleChange}
                                        required>
                                    </MDBInput>
                                    {/* {this.state.emailError ? <small>{this.state.emailErrorMsg}</small> : null} */}
                                    <MDBInput label='create password'
                                        type='password'
                                        name='registerPassword'
                                        value={this.state.registerPassword}
                                        onChange={this.handleChange}
                                        required>
                                    </MDBInput>
                                    <MDBInput label='confirm password'
                                        type='password'
                                        name='registerPassword2'
                                        value={this.state.registerPassword2}
                                        onChange={this.handleChange}
                                        required>
                                    </MDBInput>
                                    <MDBInput label='Add a profile image'
                                        type='url'
                                        name='registerProfileImg'
                                        value={this.state.registerProfileImg}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBInput label='favourite quote or a sentence to describe yourself'
                                        type='text'
                                        name='registerProfileBio'
                                        value={this.state.registerProfileBio}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBBtn type='submit'>join the club!</MDBBtn>
                                    <p>Already have an account? <a href="/">Log in</a></p>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </div>

        )
    }
}

export default SignUpPage
