import React, { Component, Fragment } from 'react'
import {
    MDBCol, MDBRow, MDBBtn,
    MDBCard, MDBCardBody, MDBCardTitle,
    MDBCardImage, MDBIcon, MDBCardText,
    MDBCardFooter, MDBLink
} from 'mdbreact'

import { BrowserRouter as Route } from 'react-router-dom';
import CommentModal from './CommentModal'
import api from '../api';
import EditGif from './edit/editGif' 
import EditMeme from './edit/editMeme'
import EditPun from './edit/editPun'

class UserContentCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            likes: this.props.likeAmt,
            commentModal: false,
            commentAmt: this.props.commentAmt
        }
    }

    // componentDidMount = async () => {
    //     try {
    //         const response = await (api.editGif, api.editMeme, api.editPun);
    //         this.setState({
    //             userId: response.data._id,
    //             username: response.data.username,
    //             profileImg: response.data.profileImg,
    //             profileBio: response.data.profileBio,
    //             authenticated: true
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         this.setState({
    //             authenticated: false
    //         })
    //     }
    // }

    toggleCommentModal = () => {
        this.setState({
            commentModal: !this.state.commentModal
        })
    }
    updateComment = (commentAmt) => {
        this.setState({
            commentAmt: commentAmt
        })
    }
    
    handleDelete = async () => {
        const payload = {
            id : this.props.id,
            contentType : this.props.contentType
        }
        
        let c = window.confirm('confirm delete')
        if(c) {
            this.props.handleDelete(payload)
        }
        else return false
    }


    editOneGif = () => {
        alert('editing')
        // this.setState({
        //     edit: true,
        //     image: this.props.imgUrl,
        //     caption: this.props.caption
        // })
        // const payload = {
        //     image: this.props.imgUrl,
        //     caption: this.props.caption
        // }
    }

        // on click function to update edit
        handleEdits = async content => {
            const id = this.props.id;
            await this.setState({
                likes: this.state.likes + 1
            })
            try {
                const payload = {
                   content : this.state.content,
                   caption : this.state.caption
                }
                if (content === 'Meme') await api.editMeme(id, payload);
                if (content === 'Gif') await api.editGif(id, payload);
                if (content === 'Pun') await api.editPun(id, payload);
            } catch (err) {
                console.log(err)
            }
        }

    // on click function to update likes
    handleLikes = async content => {
        const id = this.props.id;
        await this.setState({
            likes: this.state.likes + 1
        })
        try {
            const payload = {
                likes: this.state.likes
            }
            if (content === 'Meme') await api.updateMeme(id, payload);
            if (content === 'Gif') await api.updateGif(id, payload);
            if (content === 'Pun') await api.updatePun(id, payload);
        } catch (err) {
            console.log(err)
        }
    }
    

    renderProfile = () => {
        window.location.href=`/session/profile/${this.props.postedBy}`
    }

    render() {
        return (
            <Fragment>
                <MDBCard style={{ width: "22rem" }} className='m-4'>

                    <MDBCardImage
                        style={{ width: '100%', height: 'auto' }}
                        className="img-fluid mx-auto"
                        src={this.props.imgUrl}
                        waves>
                    </MDBCardImage>
                    <MDBCardTitle className='mx-2 p-2 border-bottom'>{this.props.pun}</MDBCardTitle>
                    <MDBCardBody style={{ flex: '0 1 auto' }}>
                        <MDBCardText>
                            {this.props.caption}
                        </MDBCardText>
                

                        <MDBLink to='/session/edit/meme/:id'>Edit Meme</MDBLink>
                        <MDBLink to='/session/edit/gif/:id'>Edit Gif</MDBLink>
                        <MDBLink to='/session/edit/pun/:id'>Edit Pun</MDBLink>
                        
                        <MDBBtn onClick={this.handleDelete} size="sm">delete</MDBBtn>{/*delete route*/}

                    </MDBCardBody>
                    <MDBRow className='mx-0 p-2 justify-content-center align-items-end' style={{ flex: '1 1 auto' }}>
                        <MDBCol>
                            <MDBIcon icon="share" size="lg" className="m-auto align-self-center thumbs-up" />
                        </MDBCol>
                        <MDBCol>

                            <MDBRow className='mx-auto justify-content-center'>
                                <MDBIcon icon="thumbs-up" size="lg" className="m-auto align-self-center thumbs-up" onClick={() => this.handleLikes(this.props.contentType)} />
                                <h5 className="font-weight-light m-auto">{this.state.likes}</h5>
                            </MDBRow>

                        </MDBCol>
                        <MDBCol>
                        <MDBCol>
                            <MDBRow className='mx-auto justify-content-center'>
                                <MDBIcon icon="edit" size="lg" onClick={this.toggleEditGifModal} className="m-auto align-self-center thumbs-up" />
                                <h5 className="font-weight-light m-auto align-self-center"> {this.state.commentAmt}</h5> 
                            </MDBRow>
                        </MDBCol>

                            <MDBRow className='mx-auto justify-content-center' >
                                <MDBIcon icon="comment-dots" onClick={() => { this.toggleCommentModal() }} size="lg" className="m-auto align-self-center thumbs-up" />
                                <h5 className="font-weight-light m-auto align-self-center"> {this.state.commentAmt}</h5>
                            </MDBRow>

                        </MDBCol>
                    </MDBRow>
                    <MDBCardFooter color="grey lighten-1" >
                        <p className="content-username" onClick={this.renderProfile}>posted by <span>{this.props.postedBy}</span></p>
                    </MDBCardFooter>
                </MDBCard>
                {/* comment section */}
                {this.state.commentModal ?
                    <CommentModal
                        currentUser={this.props.currentUser}
                        id={this.props.id}
                        commentModal={this.state.commentModal}
                        comments={this.props.comments}
                        handleCommentModal={this.toggleCommentModal}
                        content={this.props.contentType}
                        handleComment={this.updateComment}
                    />
                    :
                    null
                }                            
                <Route path="/session/edit/meme/:id" component={EditMeme} />
                <Route path="/session/edit/pun/:id" component={EditPun} />
                <Route path="/session/edit/gif/:id" component={EditGif} /> 

            </Fragment>
        )
    }
}

export default UserContentCard
