import React, { Component, Fragment } from 'react'
import { MDBRow, MDBCol } from "mdbreact";
import { Link } from 'react-router-dom';
import Header from './Header';
import memeIcon from '../public/meme_icon.png'
import gifIcon from '../public/gif_icon.gif'
import punIcon from '../public/pun_icon.png'

const h5Style = {
  textDecoration: 'none',
  color: '#212529'
}
export class Features extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <section className="text-center my-5 w-75 mx-auto">
          <h2 className="h1-responsive font-weight-bold my-5">
            "There is no strong beer only weak men."
        </h2>
          <MDBRow className='my-5'>
            <MDBCol md="4" className='pb-5'>
              <Link to='/session/memes'><img width='auto' height='80px' src={memeIcon} alt='memeicon' />
                {/* <Link to ='/session/memes'><MDBIcon far icon="comments" size="3x" className="orange-text" /> */}
                <h5 className="font-weight-bold my-4" style={h5Style}>MEMES</h5>
              </Link>
              <p className="grey-text mb-md-0 mb-5">
                A collection of cultural and behavioral expression enough to bring sunshine
                and laughters to your lady.
            </p>
            </MDBCol>
            <MDBCol md="4" className='pb-5'>
              <Link to='/session/gifs'><img width='auto' height='80px' position='cover' src={gifIcon} alt='gificon' />
                {/* <Link to ='/session/gifs'><MDBIcon icon="chart-area" size="3x" className="red-text" /> */}
                <h5 className="font-weight-bold my-4" style={h5Style}>GIFS</h5>
              </Link>
              <p className="grey-text mb-md-0 mb-5">
                Express yourself with giphys to make your conversation with her lighted
                ,making her feel comfortable and at ease at all times.
            </p>
            </MDBCol>
            <MDBCol md="4" className='pb-5'>
              <Link to='/session/puns'><img width='auto' height='80px' position='cover' src={punIcon} alt='punicon' />
                {/* <Link to ='/session/puns'><MDBIcon icon="book" size="3x" className="cyan-text" /> */}
                <h5 className="font-weight-bold my-4" style={h5Style}>PUNS</h5>
              </Link>
              <p className="grey-text mb-md-0 mb-5">
                Intelligent attracts, period. So go dazzle your girl with puns that would leave her star-strucked.
            </p>
            </MDBCol>
          </MDBRow>
        </section>
      </Fragment>
    )
  }
}

export default Features
