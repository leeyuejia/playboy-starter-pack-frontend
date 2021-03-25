import { MDBCard, MDBCol, MDBContainer, MDBCardTitle, MDBCardBody } from 'mdbreact';
import React, { Component, Fragment } from 'react'


class GoogleSearch extends Component {
    render() {
        return (
            <div className='landingPage'>
                <MDBContainer style={{ maxWidth: "35rem" }}>
                    <MDBCol>
                        <MDBCard>
                            <MDBCardTitle className='mt-4 mb-0'>
                                <strong>this is route https://playboy-starter-pack-frontend.herokuapp.com/signup/7/11</strong>
                            </MDBCardTitle>
                            <MDBCardBody>
                                <div className="gcse-search"></div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>
            </div>
        );
    }
}

export default GoogleSearch;