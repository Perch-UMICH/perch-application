import React, { Component } from 'react';
import './Footer.css'
import Typed from 'typed.js';

class Footer extends Component {
	render() {
		return(
			<div className="footer center-align">
				{/*Home*/}
				<div className='footer-column'>
					<div className='footer-header'>Home</div>
					<div className='footer-content'>Sign Up</div>
				</div>
				{/*Prodcut*/}
				<div className='footer-column'>
					<div className='footer-header'>Product</div>
					<div className='footer-content'>Perch Education</div>
					<div className='footer-content'>Help Center</div>
				</div>
				{/*About*/}
				<div className='footer-column'>
					<div className='footer-header'>About</div>
					<div className='footer-content'>The Perch Story</div>
					<div className='footer-content'>Team</div>
					<div className='footer-content'>Timeline</div>
				</div>
				{/*News*/}
				<div className='footer-column'>
					<div className='footer-header'>News</div>
					<div className='footer-content'>Blog</div>
					<div className='footer-content'>Newsletter</div>
					<div className='footer-content'>Press</div>
				</div>
				{/*Contact*/}
				<div className='footer-column'>
					<div className='footer-header'>Contact</div>
					<div className='footer-content'>Join Us</div>
				</div>
				{/*Legal*/}
				<div className='footer-column'>
					<div className='footer-header'>Legal</div>
					<div className='footer-content'>Terms of Service</div>
					<div className='footer-content'>Privacy Policy</div>
				</div>
			</div>
		);
	} 
}

export default Footer;