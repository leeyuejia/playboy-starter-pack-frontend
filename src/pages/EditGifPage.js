import React, { Component, Fragment } from 'react';
import EditGif from '../components/edit/EditGif';

class EditGifPage extends Component {
    render() {
        return (
            <Fragment>
                <EditGif id={this.props.match.params.id} />
            </Fragment>
        )
    }

}

export default EditGifPage