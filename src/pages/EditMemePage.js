import React, { Component, Fragment } from 'react';
import EditMeme from '../components/edit/EditMeme';

class EditMemePage extends Component {
    render() {
        return (
            <Fragment>
                <EditMeme id={this.props.match.params.id} />
            </Fragment>
        )
    }

}

export default EditMemePage