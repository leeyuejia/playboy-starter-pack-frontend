import React, { Component } from 'react'
import {
    MDBContainer, MDBModal,
    MDBModalBody, MDBModalHeader,
} from 'mdbreact'
import { 
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    LineShareButton,
    FacebookIcon,
    LineIcon,
    WhatsappIcon,
    TwitterIcon,
    PinterestIcon, 
} from "react-share"

export class Share extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    handleComment = (commentAmt) => {
        this.props.handleComment(commentAmt)
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount = async () => {
        await this.setState({
            contentType : this.props.contentType,
            content : (this.props.contentType === 'Pun')? this.props.pun : this.props.url
        })
    }


    render() {
        const defaultPunImage = 'https://i.redd.it/4iqm06sb22b01.jpg'
        return (
            <MDBContainer>
                <MDBModal
                    isOpen={this.props.shareModal}
                    toggle={this.props.handleShareModal}>
                    <MDBModalHeader toggle={this.props.handleShareModal} className='text-center'>
                        Share via
                </MDBModalHeader>
                    <MDBModalBody>
                        <FacebookShareButton 
                        url={this.state.content} 
                        quote={this.props.text} 
                        className='mx-2'>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>

                        <TwitterShareButton 
                        url={this.state.content} 
                        title={this.props.text} 
                        className='mx-2'>
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>

                        <LineShareButton 
                        url={this.state.content} 
                        title={this.props.text} 
                        className='mx-2'>
                            <LineIcon size={32} round={true} />
                        </LineShareButton>

                        <PinterestShareButton 
                        url = {this.state.contentType==='Pun'? defaultPunImage: this.state.content}
                        media= {this.state.contentType==='Pun'? defaultPunImage: this.state.content} //mandatory
                        description={this.state.contentType==='Pun'? this.props.text: this.state.content}  //mandatory
                        className='mx-2'>
                            <PinterestIcon size={32} round={true} />
                        </PinterestShareButton>

                        <WhatsappShareButton 
                        url={this.state.content} 
                        title={this.props.text} 
                        media={this.state.content} 
                        className='mx-2'>
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default Share
