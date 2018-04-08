import React, {Component} from 'react';
import {isStudent, isLab} from '../helper.js'
import './UpdateContact.css';

class UpdateContact extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="">
				<div className='lab-text-info shift-down' style={{width: '700px', margin: '50px auto'}}>
					<form className='container center-align lab-text-info-form shadow'>
						<div className='lab-text-info-header'>Update Contact Info</div>

						{isStudent() != 'null' && 
						<div className='row'>
							<div className='input-field col s12'>
								<input id='contact-email' className='gen-input' type='email' />
								<label htmlFor="contact-email">Email / Username</label>
							</div>
						</div>}

						{isLab() != 'null' && 
						<div className='row'>
							<div className='input-field col s12'>
								<input id='contact-email' className='gen-input' type='email' />
								<label htmlFor="contact-email">Email / Username</label>
							</div>
							<div className='input-field col s12'>
								<input id='contact-location' className='gen-input' type='text' />
								<label htmlFor="contact-location">Lab Location</label>
							</div>
						</div>}

					</form>
				</div>
			</div>
		);
	}
}

export default UpdateContact;