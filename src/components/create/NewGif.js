import React, { Component, Fragment } from 'react'
import { Redirect} from "react-router-dom"
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle
}
    from 'mdbreact';

import api from '../../api';

export class NewGif extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gifImg: '',
            gifCaption: '',
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
            return <Redirect to='/session/gifs' />
        } else return false
    }
    registerGif = async event => {
        event.preventDefault();
        try {
            const payload = {
                content: this.state.gifImg,
                caption : this.state.gifCaption
            }
            await api.registerGif(payload)
            console.log('registered')
            await alert('Gif added!')
            this.setState({
                gifImg: '',
                gifCaption: '',
                addSuccess: true
            })
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
                                Create Giphy
                   </MDBCardTitle>
                            <MDBCardBody>
                                <form onSubmit={this.registerGif}>
                                    <MDBInput label='Add a giphy image'
                                        type='url'
                                        name='gifImg'
                                        accept='.gif'
                                        value={this.state.gifImg}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBInput label='caption'
                                        type='text'
                                        name='gifCaption'
                                        value={this.state.gifCaption}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBBtn type='submit'>Add gif</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default NewGif
