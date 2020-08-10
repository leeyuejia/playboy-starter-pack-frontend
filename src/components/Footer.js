import React, { Component } from 'react'
import { MDBContainer, MDBFooter ,MDBBtn } from "mdbreact";
import {SpecialFeature} from './SpecialFeature'

export class footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
             specialModal :false 
        }
    }
    toggleSpecial = () => {
        this.setState({
            specialModal : !this.state.specialModal
        })
    }

    footerStyle = () => {
        return {
            position: 'fixed',
            left : '0',
            bottom : '0',
            width: '100%'
        }
    }
    render() {
        return (
            <MDBFooter color="elegant-color" className="font-small mt-4" style={this.footerStyle()}>
                <MDBContainer fluid className="footer-copyright text-center py-3">
                    &copy; {new Date().getFullYear()} Developed by JJYJ | Playboy starter pack | 
                    <MDBBtn onClick={this.toggleSpecial} className='mx-4 my-0' outline color='blue-grey lighten-5' size='sm'>If all else fails...</MDBBtn>
                </MDBContainer>
                {this.state.specialModal? 
                    <SpecialFeature 
                        specialModal = {this.state.specialModal}
                        handleSpecialModal ={this.toggleSpecial}/>
                    :
                    null
                }
            </MDBFooter>
        )
    }
}
export default footer
