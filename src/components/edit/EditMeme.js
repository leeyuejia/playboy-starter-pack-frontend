import React, { Component, Fragment } from 'react'
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle
}
    from 'mdbreact';
import api from '../../api';

export class EditMeme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memeImg: '',
            memeCaption: '',
            username:'' ,
            addSuccess: false
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getOneMeme(this.props.id);
            const userResponse = await api.getUser()
            this.setState({
                memeImg: response.data.content,
                memeCaption: response.data.caption,
                username: userResponse.data.username
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateMeme = async event => {
        event.preventDefault();

        try {
            const payload = {
                content: this.state.memeImg,
                caption: this.state.memeCaption,
            }
            await api.updateMeme(this.props.id, payload)

            this.setState({
                memeImg: '',
                memeCaption: '',
                addSuccess: true
            })
            window.location.href=`/session/profile/${this.state.username}`
        } catch (err) {
            this.setState({
                error: true
            })
        }
    }
    render() {
        console.log(this.state.memeImg)
        return (
            <Fragment>
                {/* <NavBar /> */}
                <MDBContainer className='my-3'>
                    <MDBCol style={{ maxWidth: "35rem" }}>
                        <MDBCard>
                            <MDBCardTitle className='m-2'>
                                Edit Meme
                   </MDBCardTitle>
                            <MDBCardBody>
                                <form onSubmit={this.updateMeme}>
                                    <MDBInput label='Edit an image'
                                        type='url'
                                        name='memeImg'
                                        value={this.state.memeImg}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBInput label='caption'
                                        type='text'
                                        name='memeCaption'
                                        value={this.state.memeCaption}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBBtn type='submit'>Edit memes</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default EditMeme
