import React, { Component, Fragment } from 'react';
import EditPun from '../components/edit/EditPun';

class EditPunPage extends Component {
    render() {
        return (
            <Fragment>
                <EditPun id={this.props.match.params.id} />
            </Fragment>
        )
    }
}

export default EditPunPage
