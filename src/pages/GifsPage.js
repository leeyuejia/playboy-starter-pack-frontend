import React, { Component, Fragment } from 'react';
import { MDBRow } from 'mdbreact';
import ContentCard from '../components/ContentCard';
import api from '../api';
import SearchBox from '../components/SearchBox';
import EditGif from '../components/edit/editGif'

export class GifsPage extends Component {
    state = {
        gifData: [],
        searchField: ''
    }

    componentDidMount = async () => {
        try {
            const response = await api.getAllGifs()

            this.setState({
                gifData: response.data
            })
            console.log(this.state.gifData)
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

        const gifsContent = this.state.gifData.filter(gif => {
            return (gif.caption.toLowerCase().includes(this.state.searchField.toLowerCase()) 
            || gif.content.toLowerCase().includes(this.state.searchField.toLowerCase())
            || gif.username.toLowerCase().includes(this.state.searchField.toLowerCase()))
        }).map(gif => {
            return <ContentCard
                currentUser = {this.props.username}
                imgUrl={gif.content}
                caption={gif.caption}
                postedBy={gif.username}
                comments ={gif.comments}
                commentAmt={gif.comments.length}
                likeAmt={gif.likes}
                id={gif._id}
                key={gif._id}
                contentType={gif.contentType}
            />
        })

        return (
            <Fragment>
                <MDBRow>
                    <img
                        src='https://i.imgur.com/AqFk9Ux.gif'
                        className="rounded-circle img-fluid mx-auto my-3 d-block"
                        alt="cat gif"
                        title='cat gif'
                        width='500' height='300'
                        style={{ margin: '0 auto' }} />
                </MDBRow>

                {/* Edit Button */}
                <EditGif handleChange={this.handleChange} />


                {/* Search box */}
                <SearchBox handleChange={this.handleChange} />

                <MDBRow style={{ width: "75%", justifyContent: "center" }} className='mx-auto mb-5'>
                    {/* fetch gif here */}
                    {this.state.gifData ? gifsContent : null}
                </MDBRow>
            </Fragment>
        )
    }
}
export default GifsPage
