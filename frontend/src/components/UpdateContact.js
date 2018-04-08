import React, {Component} from 'react';
import {isStudent, isLab, getStudent, getCurrentStudentId, getLab, getCurrentLabId, updateLab} from '../helper.js'
import './UpdateContact.css';

class UpdateContact extends Component {
	constructor(props) {
		super(props);
		this.state= {}
	}

	grabStudentInfo() { 
		getStudent(getCurrentStudentId()).then(resp => this.setState({email: resp.data.email}));
	}

	grabLabInfo() { 
		getLab(getCurrentLabId()).then(resp => this.setState({
			email: resp.data.contact_email,
			phone: resp.data.contact_phone,
			location: resp.data.location,
		}));
		getLab(getCurrentLabId()).then(resp => console.log(resp))
	}

	updateInfo(event) {
		event.preventDefault()
		if (isStudent()) 
			console.log('hi')
		else if (isLab()) 
			updateLab(getCurrentLabId(), null, null, this.state.location, null, null, null, null, null, this.state.phone, this.state.email)
	}

	componentDidMount() {
		if (isStudent()) 
			this.grabStudentInfo()
		
		else if (isLab())
			this.grabLabInfo();
	}

	render() {
		return (
			<div className="">
				<div className='lab-text-info shift-down' style={{width: '700px', margin: '50px auto'}}>
					<form className='container center-align lab-text-info-form shadow' onSubmit={this.updateInfo.bind(this)}>
						<div className='lab-text-info-header'>Update Contact Info</div>

						{isStudent() &&
						<div className='row'>
							<div className='input-field col s12'>
								<input id='contact-email' className='gen-input' type='email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} autofocus="autofocus"/>
								<label htmlFor="contact-email" >Email / Username</label>
							</div>
						</div>}

						{isLab() && 
						<div className='row'>
							<div className='input-field col s12'>
								<input id='contact-email' className='gen-input' type='email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} autofocus="autofocus"/>
								<label htmlFor="contact-email">Email</label>
							</div>
							<div className='input-field col s12'>
								<input id='contact-location' className='gen-input' type='text' onChange={(event) => this.setState({location: event.target.value})} autofocus="autofocus"/>
								<label htmlFor="contact-location">Lab Location</label>
							</div>
						</div>}
						<button>submit</button>
					</form>
				</div>
			</div>
		);
	}
}

export default UpdateContact;