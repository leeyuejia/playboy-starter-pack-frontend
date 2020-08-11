import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom'
import UserContentCard from '../components/UserContentCard';
import EditGif from './edit/editGif'

class UserGifs extends Component {
    render() {
        return (
            <Fragment>
                <UserContentCard 
                    currentUser = {this.props.currentUser}
                    comments = {this.props.comments}
                    commentAmt={this.props.commentAmt}
                    caption={this.props.caption}
                    imgUrl={this.props.imgUrl}
                    postedBy={this.props.postedBy}
                    id={this.props.id}
                    contentType={this.props.contentType}
                    likeAmt={this.props.likeAmt}
                    handleDelete = {this.props.deleteContent} />
                    <Route path="/session/edit/gif/:id" component={EditGif} />
            </Fragment>
        )
    }
}

export default UserGifs
