import React, { Component, Fragment } from 'react'
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle
}
    from 'mdbreact';
import api from '../../api';

export class EditGif extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gifImg: '',
            gifCaption: '',
            username:'' ,
            addSuccess: false
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getOneGif(this.props.id);
            const userResponse = await api.getUser()
            this.setState({
                gifImg: response.data.content,
                gifCaption: response.data.caption,
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

    updateGif = async event => {
        event.preventDefault();

        try {
            const payload = {
                content: this.state.gifImg,
                caption: this.state.gifCaption,
            }
            await api.updateGif(this.props.id, payload)

            this.setState({
                gifImg: '',
                gifCaption: '',
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
        return (
            <Fragment>
                {/* <NavBar /> */}
                <MDBContainer className='my-3'>
                    <MDBCol style={{ maxWidth: "35rem" }}>
                        <MDBCard>
                            <MDBCardTitle className='m-2'>
                                Edit gif
                   </MDBCardTitle>
                            <MDBCardBody>
                                <form onSubmit={this.updateGif}>
                                    <MDBInput label='Edit an image'
                                        type='url'
                                        name='gifImg'
                                        accept='image/*'
                                        value={this.state.gifImg}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBInput label='caption'
                                        type='text'
                                        name='gifCaption'
                                        value={this.state.gifCaption}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBBtn type='submit'>Edit gifs</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default EditGif