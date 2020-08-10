import React, { Component, Fragment } from 'react';
import { MDBRow } from 'mdbreact';
import ContentCard from '../components/ContentCard';
import api from '../api';
import SearchBox from '../components/SearchBox';

export class PunsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            punsData: [],
            searchField: ''
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getAllPuns()

            this.setState({
                punsData: response.data
            })
            console.log(this.state.punsData)
        } catch (err) {
            this.setState({
                error: err
            })
        }
    }

    handleChange = event => {
        this.setState({
            searchField: event.target.value
        })
    }

    render() {

        const punsContent = this.state.punsData.filter(pun => {
            return (pun.caption.toLowerCase().includes(this.state.searchField.toLowerCase()) 
            || pun.content.toLowerCase().includes(this.state.searchField.toLowerCase())
            || pun.username.toLowerCase().includes(this.state.searchField.toLowerCase()))
        }).map(pun => {
            return <ContentCard
                currentUser = {this.props.username}
                pun={pun.content}
                caption={pun.caption}
                postedBy={pun.username}
                comments ={pun.comments}
                commentAmt={pun.comments.length}
                likeAmt={pun.likes}
                id={pun._id}
                key={pun._id}
                contentType={pun.contentType}
            />
        })

        return (
            <Fragment>
                {/* <NavBar /> */}
                <MDBRow>
                    <img
                        src='https://i.redd.it/4iqm06sb22b01.jpg'
                        className=" img-fluid mx-auto my-3 d-block"
                        alt="puns title"
                        title='puns title'
                        width='500' height='300' />
                </MDBRow>

                {/* Search box */}
                <SearchBox handleChange={this.handleChange} />

                <MDBRow style={{ width: "70%", justifyContent: "center" }} className='mx-auto mb-5'>
                    {/* fetch pun here */}
                    {this.state.punsData ? punsContent : null}
                </MDBRow>
            </Fragment>
        )
    }
}

export default PunsPage
