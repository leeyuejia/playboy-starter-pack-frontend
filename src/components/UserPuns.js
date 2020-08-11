import React, { Component, Fragment } from 'react'
import UserContentCard from '../components/UserContentCard';
import { Route } from 'react-router-dom'
import EditPun from './edit/EditPun';

class UserPuns extends Component {
    render() {
        return (
            <Fragment>
                <UserContentCard
                currentUser = {this.props.currentUser}
                comments = {this.props.comments}
                commentAmt={this.props.commentAmt}
                caption={this.props.caption}
                pun={this.props.pun}
                postedBy={this.props.postedBy}
                id={this.props.id}
                contentType={this.props.contentType}
                likeAmt={this.props.likeAmt}
                handleDelete = {this.props.deleteContent} />
                <Route path="/session/edit/pun/:id" component={EditPun} />
            </Fragment>
        )
    }
}

export default UserPuns
