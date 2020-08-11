import React, { Component, Fragment } from 'react'
import {
    MDBContainer, MDBBtn, MDBInput,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardTitle
}
    from 'mdbreact';
import api from '../../api';

export class EditPun extends Component {
    constructor(props) {
        super(props)
        this.state = {
            punImg: '',
            punCaption: '',
            username:'' ,
            addSuccess: false
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getOnePun(this.props.id);
            const userResponse = await api.getUser()
            this.setState({
                punImg: response.data.content,
                punCaption: response.data.caption,
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

    updatePun = async event => {
        event.preventDefault();

        try {
            const payload = {
                content: this.state.punImg,
                caption: this.state.punCaption,
            }
            await api.updatePun(this.props.id, payload)

            this.setState({
                punImg: '',
                punCaption: '',
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
                                Edit pun
                   </MDBCardTitle>
                            <MDBCardBody>
                                <form onSubmit={this.updatePun}>
                                    <MDBInput label='Edit pun-ch line'
                                        type='text'
                                        name='punImg'
                                        accept='image/*'
                                        value={this.state.punImg}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBInput label='caption'
                                        type='text'
                                        name='punCaption'
                                        value={this.state.punCaption}
                                        onChange={this.handleChange}>
                                    </MDBInput>
                                    <MDBBtn type='submit'>Edit puns</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default EditPun