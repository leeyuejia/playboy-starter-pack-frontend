import React, { Component, Fragment } from 'react'
import {
    MDBCol, MDBRow, MDBBtn,
    MDBCard, MDBCardBody, MDBCardTitle,
    MDBCardImage, MDBIcon, MDBCardText,
    MDBCardFooter, MDBLink
} from 'mdbreact'
import { Route, Switch, Link } from 'react-router-dom'
import CommentModal from './CommentModal'
import Share from './Share'
import api from '../api';
import EditGif from './edit/editGif' 
import EditMeme from './edit/editMeme'
import EditPun from './edit/editPun'
import memeIcon from '../public/meme_icon.png'
import gifIcon from '../public/gif_icon.gif'
import punIcon from '../public/pun_icon.png'
import EditGifPage from '../pages/EditGifPage';

import EditMemePage from '../pages/EditMemePage';

import EditPunPage from '../pages/EditPunPage';


class UserContentCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            likes: this.props.likeAmt,
            commentModal: false,
            shareModal : false,
            commentAmt: this.props.commentAmt
        }
    }


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

        // on click function to update edit
        handleEdits = async content => {
            try {
                if (content === 'Meme')  window.location.href=`/session/edit/meme/${this.props.id}`;
                if (content === 'Gif')   window.location.href=`/session/edit/gif/${this.props.id}`;
                if (content === 'Pun')  window.location.href=`/session/edit/pun/${this.props.id}`;

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
    toggleShare = () => {
        this.setState({
            shareModal : !this.state.shareModal
        })
    }

    renderProfile = () => {
        window.location.href=`/session/profile/${this.props.postedBy}`
    }

    render() {
        return (
            <Fragment>
                <Switch>
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
                

                        <MDBBtn href="#" size="sm" onClick={() => this.handleEdits(this.props.id)}>Edit</MDBBtn> edit route
                    
                        <MDBBtn onClick={this.handleDelete} size="sm">delete</MDBBtn>{/*delete route*/}

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
                                <MDBIcon 
                                    icon="thumbs-up" 
                                    size="lg" 
                                    className="m-auto align-self-center thumbs-up" 
                                    onClick={() => this.handleLikes(this.props.contentType)} 
                                />
                                <h5 className="font-weight-light m-auto">{this.state.likes}</h5>
                            </MDBRow>

                        </MDBCol>
                        <MDBCol>
                        <MDBCol>
                        <Route path="/session/edit/gif/:id" component={EditPunPage} />
                        <Route path="/session/edit/gif/:id" component={EditMemePage} />
                        <Route path="/session/edit/gif/:id" component={EditGifPage} />
                            <MDBRow className='mx-auto justify-content-center'>
                                <Link to ='/session/edit/gifs/:id'><img width='auto' height='80px' position='cover' src={gifIcon} alt='gificon'/>
                                <h5 className="font-weight-light m-auto align-self-center"> {this.state.commentAmt}</h5> 
                                </Link>
                            </MDBRow>
                            <MDBRow className='mx-auto justify-content-center'>
                                <Link to ='/session/edit/puns/:id'><img width='auto' height='80px' position='cover' src={punIcon} alt='gificon'/>
                                <h5 className="font-weight-light m-auto align-self-center"> {this.state.commentAmt}</h5> 
                                </Link>
                            </MDBRow>
                            <MDBRow className='mx-auto justify-content-center'>
                                <Link to ='/session/edit/memes/:id'><img width='auto' height='80px' position='cover' src={memeIcon} alt='gificon'/>
                                <h5 className="font-weight-light m-auto align-self-center"> {this.state.commentAmt}</h5>
                                </Link> 
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

                </Switch>
            </Fragment>
        )
    }
}

export default UserContentCard
