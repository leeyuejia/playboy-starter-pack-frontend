import React, { Component} from 'react';
import { 
    MDBRow, MDBCol, MDBCardBody, 
    MDBCardText, MDBCardTitle, MDBContainer, 
    MDBBtn, MDBModal, MDBModalBody, 
    MDBModalHeader, MDBModalFooter, MDBInput 
    } 
from 'mdbreact';
import api from '../api';
import UserGifs from '../components/UserGifs';
import UserMemes from '../components/UserMemes';
import UserPuns from '../components/UserPuns';
import defaultProfilePic from '../public/default-profile-pic.jpg'
import { BrowserRouter as Router} from 'react-router-dom';

class UserDashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            userId: '',
            username: '',
            profileImg: '',
            profileBio: '',
            memes: [],
            gifs: [],
            puns: [],
            memesLoading: false,
            gifsLoading: false,
            punsLoading: false,
            modal: false,
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getUserByUsername(this.props.match.params.username);
            console.log(response.data)
            this.setState({
                userData: response.data,
                userId: response.data._id,
                username: response.data.username,
                profileImg: response.data.profileImg,
                profileBio: response.data.profileBio,
                authenticated: true
            })
        } catch (err) {
            console.log(err)
            this.setState({
                authenticated: false
            })
        }
    }
    getGifsByUser = async () => {
        try {
            const response = await api.getGifsByUser(this.state.username)
            this.setState({
                gifs: response.data,
                gifsLoading: true,
                memesLoading: false,
                punsLoading: false
            })
        } catch (err) {
            console.log(err)
        }
    }

    getMemesByUser = async () => {
        try {
            const response = await api.getMemesByUser(this.state.username)
            this.setState({
                memes: response.data,
                memesLoading: true,
                gifsLoading: false,
                punsLoading: false
            })
        } catch (err) {
            console.log(err)
        }
    }

    getPunsByUser = async () => {
        try {
            const response = await api.getPunsByUser(this.state.username)
            this.setState({
                puns: response.data,
                punsLoading: true,
                gifsLoading: false,
                memesLoading: false
            })
            console.log(this.state.puns)
        } catch (err) {
            console.log(err)
        }
    }

    toggleEditProfileModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    userUpdateProfile = async event => {
        event.preventDefault();
        try {
            const payload = {
                userId : this.state.userId,
                username : this.state.username,
                profileImg : this.state.profileImg,
                profileBio : this.state.profileBio
            }
            await api.updateContentByUsername(payload , this.state.userData.username)
            const update = await api.updateUser(payload);            
            if(update) alert(`updated old username, ${this.state.userData.username} with ${payload.username}`)
            await this.toggleEditProfileModal();
        }
        catch (err) {
            console.log(err)
            this.setState({error :true})
        }
    }
    deleteContent = async (payload) => {
        console.log(payload)
        try {
            await api.deleteContent(payload.id)
            //refresh page
            if(payload.contentType === 'Pun') {await this.getPunsByUser()}
            else if (payload.contentType === 'Meme') {await this.getMemesByUser()}
            else if (payload.contentType === 'Gif') {await this.getGifsByUser()}
        } catch (err) {
            console.log(err)
        }
    }

    /// STYLE
    memesHeaderStyle = () => {
        return {
            color: this.state.memesLoading ? '#000' : '',
            fontWeight: this.state.memesLoading ? '400' : ''
        }
    }

    gifsHeaderStyle = () => {
        return {
            color: this.state.gifsLoading ? '#000' : '',
            fontWeight: this.state.gifsLoading ? '400' : ''
        }
    }

    punsHeaderStyle = () => {
        return {
            color: this.state.punsLoading ? '#000' : '',
            fontWeight: this.state.punsLoading ? '400' : ''
        }
    }


    render() {
        return (
            <Router>
                {/* <NavBar /> */}
                <MDBRow>
                    <MDBCol className="text-center mt-4">
                        {this.state.profileImg ? <img src={this.state.profileImg} className="img-fluid z-depth-1 rounded-circle" alt="" style={{ width: '10%' }} />
                            : <img src={defaultProfilePic} className="img-fluid z-depth-1 rounded-circle" alt="" style={{ width: '10%' }} />}
                    </MDBCol>
                </MDBRow>
                <MDBCardBody>
                    <MDBCardTitle className="indigo-text h3 mt-2">
                        {this.state.username}
                    </MDBCardTitle>

                    {this.state.profileBio ?
                        <MDBCardText className='m-4'>{this.state.profileBio}</MDBCardText>
                        :
                        null
                    }
                    <MDBBtn onClick={this.toggleEditProfileModal}>Edit profile</MDBBtn>

                    <MDBCol className="d-flex justify-content-center border-top" md="12" style={{ width: '65%', margin: '0 auto' }}>
                        <MDBCol md="4" className="d-flex justify-content-around align-items-center p-4">
                            <h3 className="user-content-header" onClick={this.getMemesByUser} style={this.memesHeaderStyle()}>
                                Memes
                            </h3>
                            <h3 className="user-content-header" onClick={this.getGifsByUser} style={this.gifsHeaderStyle()}>
                                Gifs
                            </h3>
                            <h3 className="user-content-header" onClick={this.getPunsByUser} style={this.punsHeaderStyle()}>
                                Puns
                            </h3>
                        </MDBCol>
                    </MDBCol>
                </MDBCardBody>
                <div className='user-content mb-5'>
                    {this.state.gifsLoading ? this.state.gifs.map(gif =>
                        <UserGifs
                            currentUser ={this.state.username}
                            imgUrl={gif.content}
                            caption={gif.caption}
                            postedBy={gif.username}
                            comments={gif.comments}
                            commentAmt={gif.comments.length}
                            likeAmt={gif.likes}
                            key={gif._id}
                            id={gif._id}
                            contentType={gif.contentType}
                            deleteContent = {this.deleteContent} />) : null}
                    {this.state.memesLoading ? this.state.memes.map(meme =>
                        <UserMemes
                            currentUser ={this.state.username}
                            imgUrl={meme.content}
                            caption={meme.caption}
                            postedBy={meme.username}
                            comments={meme.comments}
                            commentAmt={meme.comments.length}
                            likeAmt={meme.likes}
                            key={meme._id}
                            id={meme._id}
                            contentType={meme.contentType}
                            deleteContent = {this.deleteContent} />) : null}
                    {this.state.punsLoading ? this.state.puns.map(pun =>
                        <UserPuns
                            currentUser ={this.state.username}
                            pun={pun.content}
                            caption={pun.caption}
                            postedBy={pun.username}
                            comments={pun.comments}
                            commentAmt={pun.comments.length}
                            likeAmt={pun.likes}
                            key={pun._id}
                            id={pun._id}
                            contentType={pun.contentType}
                            deleteContent = {this.deleteContent} />) : null}
                </div>
                {/* edit profile modal */}
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleEditProfileModal}>
                        <form onSubmit={this.userUpdateProfile}>
                            <MDBModalHeader toggle={this.toggleEditProfileModal}>{this.state.error? 'Update fail' :'Edit profile'}</MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput label='username'
                                    type='text'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required>
                                </MDBInput>
                                <MDBInput label='profile image'
                                    type='url'
                                    name='profileImg'
                                    value={this.state.profileImg}
                                    onChange={this.handleChange}
                                    required>
                                </MDBInput>
                                <MDBInput label='Description'
                                    type='text'
                                    name='profileBio'
                                    value={this.state.profileBio}
                                    onChange={this.handleChange}
                                    required>
                                </MDBInput>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggleEditProfileModal}>Close</MDBBtn>
                                <MDBBtn color="primary" type='submit'>Save changes</MDBBtn>
                            </MDBModalFooter>
                            </form>
                    </MDBModal>
                </MDBContainer>
            </Router>
        )
    }
}

export default UserDashboardPage

//test