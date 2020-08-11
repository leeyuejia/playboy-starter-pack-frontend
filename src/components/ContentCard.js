import React, { Component, Fragment } from 'react'
import { 
    MDBCol, MDBRow, 
    MDBCard, MDBCardBody, MDBCardTitle, 
    MDBCardImage, MDBIcon, MDBCardText, 
    MDBCardFooter 
} 
from 'mdbreact'
import api from '../api';
import CommentModal from './CommentModal';
import Share from './Share'

class ContentCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            commentModal: false,
            shareModal :false,
            likes: this.props.likeAmt
        }
    }

    toggleCommentModal = () => {
        this.setState({
            commentModal: !this.state.commentModal
        })
    }
    toggleShare = () => {
        this.setState({
            shareModal : !this.state.shareModal
        })
    }
    updateComment = (commentAmt) => {
        this.setState({
            commentAmt : commentAmt
        })
    }

    updateGif = (commentAmt) => {
        this.setState({
            id: this.state.id,
            gifImg: '',
            gifCaption: '',
            currentUser : this.state.currentUser
        })
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
    componentDidMount = async() => {
        try {
            const getContent = await api.getOneContent(this.props.id)
            await this.setState({
                contentData : getContent.data,
                comments: [getContent.data.comments],
                commentAmt :getContent.data.comments.length

            })
        } catch (err) {
            this.setState({
                error: true
            })
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
                    </MDBCardBody>
                    <MDBRow className='mx-0 p-2 justify-content-center align-items-end' style={{ flex: '1 1 auto' }}>
                        <MDBCol>
                        <MDBIcon 
                                icon="share-alt" 
                                size="lg" 
                                className="m-auto align-self-center thumbs-up" 
                                onClick={this.toggleShare}
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBRow className='mx-auto justify-content-center'>
                                <MDBIcon icon="thumbs-up" size="lg" className="m-auto align-self-center thumbs-up" onClick={() => this.handleLikes(this.props.contentType)} />
                                <h5 className="font-weight-light m-auto"> {this.state.likes}</h5>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol>
                            <MDBRow className='mx-auto justify-content-center'>
                                <MDBIcon icon="comment-dots" size="lg" onClick={this.toggleCommentModal} className="m-auto align-self-center thumbs-up" />
                                <h5 className="font-weight-light m-auto align-self-center"> {this.state.commentAmt}</h5> 
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <MDBCardFooter color="grey lighten-1" >
                        <p className="content-username" onClick={this.renderProfile}>posted by <span>{this.props.postedBy}</span></p>
                    </MDBCardFooter>
                </MDBCard>
                {this.state.commentModal? 
                    <CommentModal
                        currentUser = {this.props.currentUser}
                        id ={this.props.id}
                        commentModal ={this.state.commentModal}
                        comments = {this.props.comments}
                        handleCommentModal = {this.toggleCommentModal}
                        content = {this.props.contentType}
                        handleComment = {this.updateComment}
                    />
                    :
                    null
                    }

                {this.state.shareModal? 
                    <Share
                        shareModal={this.state.shareModal}
                        handleShareModal={this.toggleShare}
                        pun={this.props.pun}
                        url={this.props.imgUrl}
                        contentType={ this.props.contentType}
                        text={this.props.caption}/>
                    :
                    null
                }
            </Fragment>
        )
    }
}

export default ContentCard
