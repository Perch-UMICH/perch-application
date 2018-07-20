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
					<div className='footer-header'><a href='/about' className="white-link">About</a></div>
					<div className='footer-content'><a href='/about/story' className="white-link">The Perch Story</a></div>
					<div className='footer-content'><a href='/about/team' className="white-link">Team</a></div>
					<div className='footer-content'><a href='/about/timeline' className="white-link">Timeline</a></div>
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
					<div className='footer-content'><a href='/terms-of-service' className="white-link">Terms of Service</a></div>
					<div className='footer-content'><a href='/privacy-policy' className="white-link">Privacy Policy</a></div>
				</div>
			</div>
		);
	}
}

export default Footer;
