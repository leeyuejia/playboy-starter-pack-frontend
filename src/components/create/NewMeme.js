import React, { Component, Fragment } from 'react'
import { Redirect} from "react-router-dom"
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle
}
    from 'mdbreact';
import api from '../../api';

export class NewMeme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memeImg: '',
            memeCaption: '',
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
            return <Redirect to='/session/memes' />
        } else return false
    }
    registerMeme = async event => {
        event.preventDefault();

        try {
            const payload = { 
                content: this.state.memeImg,
                caption: this.state.memeCaption,
            }
            await api.registerMeme(payload)

            this.setState({
                memeImg: '',
                memeCaption: '',
                addSuccess: true
            })
            console.log('Memes added')
            await alert('Added Memes')
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
                {/* <NavBar /> */}
                {this.redirecting()}
                <MDBContainer className='my-3'>
                    <MDBCol style={{ maxWidth: "35rem" }}>
                        <MDBCard>
                            <MDBCardTitle className='m-2'>
                                Create Meme
                   </MDBCardTitle>
                            <MDBCardBody>
                                <form onSubmit={this.registerMeme}>
                                    <MDBInput label='Add an image'
                                        type='url'
                                        name='memeImg'
                                        accept='image/*'
                                        value={this.state.memeImg}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBInput label='caption'
                                        type='text'
                                        name='memeCaption'
                                        value={this.state.memeCaption}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBBtn type='submit'>Add memes</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default NewMeme
