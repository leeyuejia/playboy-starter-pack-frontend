import React, { Component, Fragment } from 'react'
import { Redirect } from "react-router-dom";
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle
}
from 'mdbreact';
import api from '../../api';

export class NewPun extends Component {
    constructor(props) {
        super(props)
        this.state = {
            punLine: '',
            punCaption: '',
            addSuccess: false
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    redirecting = () => { // adding a function to redirect
        if (this.state.addSuccess) {
            this.setState({
                addSuccess : false
            })
            return <Redirect to='/session/puns' />
        } else return false
    }
    registerPun = async event => {
        event.preventDefault();
        try {
            const payload = {
                content: this.state.punLine,
                caption : this.state.punCaption
            }
            await api.registerPun(payload)
            this.setState({
                punLine: '',
                punCaption: '',
                addSuccess: true
            })
            console.log('pun added')
            await alert('Pun added!')
            console.log('this.state is: ', this.state)
            await this.redirecting()
        } catch (err) {
            this.setState({
                error: true
            })
        }

    }

    render() {
        return (
            <Fragment>
            {this.redirecting()}
            <MDBContainer className='my-3'>
                <MDBCol style={{ maxWidth: "35rem" }}>
                    <MDBCard>
                        <MDBCardTitle className='m-2'>
                            Create Puns
               </MDBCardTitle>
                        <MDBCardBody>
                            <form onSubmit={this.registerPun}>
                                <MDBInput label='Pun-ch line'
                                    type='text'
                                    name='punLine'
                                    value={this.state.punLine}
                                    onChange={this.handleChange}>
                                </MDBInput>
                                <MDBInput label='caption'
                                    type='text'
                                    name='punCaption'
                                    value={this.state.punCaption}
                                    onChange={this.handleChange}>
                                </MDBInput>
                                <MDBBtn type='submit'>Add Pun</MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBContainer>
        </Fragment>
        )
    }
}

export default NewPun
