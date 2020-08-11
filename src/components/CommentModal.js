import React, { Component } from 'react'
import {
    MDBContainer, MDBModal, 
    MDBModalBody, MDBModalHeader, 
    MDBListGroup, MDBListGroupItem, 
    MDBInput,MDBBtn
} from 'mdbreact'

import api from '../api'

export class CommentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // id : this.props.id,
            postComment : '',
            comments : this.props.comments,
            currentUser : this.props.currentUser,
        }
    }
    componentDidMount = async() => {
        try {
            const getComment = await api.getOneContent(this.props.id)
            console.log(getComment.data._id)
            await this.setState({
                id : getComment.data._id,
                comments : getComment.data.comments,
                currentUser : this.props.currentUser
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
    handleComment = (commentAmt) => {
        this.props.handleComment(commentAmt)
    }
    postComment = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                id : this.state.id,
                comment : this.state.postComment,
                currentUser : this.state.currentUser
            }
            console.log(payload)
            await api.postComment(payload)
            const result = await api.getOneContent(this.state.id)
            await this.setState({
                id : result.data._id,
                postComment : '',
                comments : result.data.comments,
                commentAmt : result.data.comments.length
            })
            await this.handleComment(this.state.commentAmt)
        } catch (err) {
            this.setState({
                error: true
            })
        }
    }
    render() {
        return (
            <MDBContainer>
            <MDBModal 
            isOpen={this.props.commentModal} 
            toggle={this.props.handleCommentModal}>
                <MDBModalHeader toggle={this.props.handleCommentModal} className='text-center'>
                    Comments
                </MDBModalHeader>
                <MDBModalBody>
                    {/* <MDBListGroup style={{ width: "100%", height: '200px', overflow: 'scroll' }}>
                        {this.state.comments.map ((comment,index)=> {
                            return <MDBListGroupItem className ={index}>
                                <div className="d-flex w-100 align-items-end">
                                    <p className="mb-1">{comment.description}</p>
                                </div>
                                <small className='text-right'>posted by :{comment.commentedBy} </small>
                            </MDBListGroupItem>
                        })
                    }
                    </MDBListGroup> */}
                    <form onSubmit={this.postComment}>
                        <MDBInput label='comment'
                            type='text'
                            name='postComment'
                            value={this.state.postComment}
                            onChange={this.handleChange}
                            required>
                        </MDBInput>
                        <MDBBtn color="primary" type='submit'>Post</MDBBtn>
                    </form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>

        )
    }
}

export default CommentModal
