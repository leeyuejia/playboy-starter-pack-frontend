import React, { Component, Fragment } from 'react'
import { Redirect} from "react-router-dom"
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
            return <Redirect to='/session/edit/memes' />
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
                                Edit Meme
                   </MDBCardTitle>
                            <MDBCardBody>
                                <form onSubmit={this.registerMeme}>
                                    <MDBInput label='Edit an image'
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

// constructor (props) {
//     super(props)
//     this.state = {
//       description: '',
//       todos: []
//     }
//   }

//   updateToDo = (todo, index) => {
//     todo.complete = !todo.complete
//     fetch('todos/' + todo._id, {
//       body: JSON.stringify(todo),
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(updatedToDo => updatedToDo.json())
//       .then(jsonedToDo => {
//         fetch('/todos')
//           .then(response => response.json())
//           .then(todos => {
//             this.setState({ todos: todos })
//           })
//       })
//   }