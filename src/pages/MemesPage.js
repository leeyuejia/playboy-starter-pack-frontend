import React, { Component, Fragment } from 'react';
import { MDBRow } from 'mdbreact';
import ContentCard from '../components/ContentCard';
import api from '../api';
import SearchBox from '../components/SearchBox';

export class MemesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memesData: [],
            searchField: ''
        }
    }

    componentDidMount = async () => {
        try {
            const response = await api.getAllMemes()

            this.setState({
                memesData: response.data
            })
            console.log(this.state.memesData)
        } catch (err) {
            console.log(err)
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

        const memesContent = this.state.memesData.filter(meme => {
            return (meme.caption.toLowerCase().includes(this.state.searchField.toLowerCase()) 
            || meme.content.toLowerCase().includes(this.state.searchField.toLowerCase()) 
            || meme.username.toLowerCase().includes(this.state.searchField.toLowerCase()))
        }).map(meme => {
            return <ContentCard
                currentUser = {this.props.username}
                imgUrl={meme.content}
                caption={meme.caption}
                postedBy={meme.username}
                comments ={meme.comments}
                commentAmt={meme.comments.length}
                likeAmt={meme.likes}
                id={meme._id}
                key={meme._id}
                contentType={meme.contentType}
            />
        })

        return (
            <Fragment>
                <MDBRow>
                    <img
                        src='https://www.netbase.com/wp-content/uploads/Brands%E2%80%99-Meme-Marketing-Makes-Sentiment-Analysis-More-Important-Than-Ever.png'
                        className=" img-fluid mx-auto my-3 d-block"
                        alt="memes title"
                        title='memes title'
                        width='500' height='300'
                        style={{ margin: '0 auto' }} />
                </MDBRow>

                {/* Search box */}
                <SearchBox handleChange={this.handleChange} />

                <MDBRow style={{ width: "70%", justifyContent: "center" }} className='mx-auto mb-5'>
                    {/* fetch meme here */}
                    {this.state.memesData ? memesContent : null}
                </MDBRow>
            </Fragment>
        )
    }
}

export default MemesPage
