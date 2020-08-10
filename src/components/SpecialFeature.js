import React, { Component } from 'react'
import {
    MDBContainer, MDBModal,
    MDBModalBody,
    MDBBtn
} from 'mdbreact'

import Axios from 'axios';

export class SpecialFeature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content : ''

        }
    }
    generatePickupLines = () => {
        Axios.get('https://pebble-pickup.herokuapp.com/tweets/random')
        .then(async res => {
            await this.setState({
                content: res.data.tweet
            })
            console.log(this.state)
        }, err => {
            console.log(err)
        })
    }
    

    render() {
        return (
            <MDBContainer>
            <MDBModal
                isOpen={this.props.specialModal}
                toggle={this.props.handleSpecialModal}>
                <MDBModalBody>
                    {this.state.content? 
                        <h4 className='text-center' style={{color:'black'}}>{this.state.content}</h4>
                        :
                        null
                    }
                </MDBModalBody>
                <div toggle={this.props.handleSpecialModal} className='text-center align-items-center m-0 border-top'>
                    <MDBBtn onClick={this.generatePickupLines} color='warning' size='sm'>use at your own risk</MDBBtn>
                </div>
            </MDBModal>
        </MDBContainer>
        )
    }
}

export default SpecialFeature
