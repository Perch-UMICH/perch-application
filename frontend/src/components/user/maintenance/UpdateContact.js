import React, {Component} from 'react';
import {isStudent, isLab, getStudent, getCurrentStudentId, getCurrentUserId, getLab, getCurrentLabId, updateLab, updateStudent, getAllStudents, getUser,  returnToProfile} from '../../../helper.js'
import BasicButton from '../../utilities/buttons/BasicButton'
import './UpdateContact.css';

class UpdateContact extends Component {
	constructor(props) {
		super(props);
		this.state= {
			url_string: this.props.location.pathname.split('/')[1],
		}
	}

	grabStudentInfo() {
		getStudent(getCurrentStudentId()).then(resp => {
			if (resp.data) {
				this.setState({email: resp.data.email})
			}
		});
	}

	grabLabInfo() {
		getLab(getCurrentLabId()).then(resp => this.setState({
			email: resp.data.contact_email,
			location: resp.data.location,
		}));
		// getLab(getCurrentLabId()).then(resp => alert(resp.data.location))
	}

	updateInfo(event) {
		event.preventDefault()
		if (isStudent())
			updateStudent(getCurrentStudentId(), null, null, null, null, null, this.state.email, null, null, null, null).then(this.redirect.bind(this))
		else if (isLab())
			updateLab(getCurrentLabId(), null, null, this.state.location, null, null, null, null, null, null, this.state.email).then(this.redirect.bind(this))
	}

	componentDidMount() {
		if (isStudent())
			this.grabStudentInfo()

		else if (isLab())
			this.grabLabInfo();
	}

	redirect() {
		if (this.state.url_string === "update-contact") {
			returnToProfile();
		} else {
			window.location = '/lab-skills';
			/* DEFAULTING TO STUDENT ONBOARDING
			if (isStudent())
				window.location = '/pick-your-interests?user_type=student';
			else if (isLab())
				window.location = '/lab-name';*/
		}
	}

	render() {
		return (
			<div className="">
				<div className='lab-text-info shift-down' style={{width: '700px', margin: '50px auto'}}>
					<form className='container center-align lab-text-info-form shadow' onSubmit={this.updateInfo.bind(this)}>
						<div className='lab-text-info-header'>
							{this.state.url_string === "update-contact" ?  <div>Update</div> : null } Contact Info
						</div>
						{isStudent() &&
						<div className='row'>
							<div className='input-field col s12'>
								<input id='contact-email' className='gen-input' type='email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} autofocus="autofocus"/>
								<label htmlFor="contact-email" >Email ( may differ from username )</label>
							</div>
						</div>}

						{isLab() &&
						<div className='row'>
							<div className='input-field col s12'>
								<input id='contact-email' className='gen-input' type='email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} autofocus="autofocus"/>
								<label htmlFor="contact-email">Public Email</label>
							</div>
							<div className='input-field col s12'>
								<input id='contact-location' className='gen-input' type='text' value={this.state.location} onChange={(event) => this.setState({location: event.target.value})} autofocus="autofocus"/>
								<label htmlFor="contact-location">Lab Location</label>
							</div>
						</div>}
						{this.state.url_string === "update-contact" ?
							<BasicButton msg='save' /*color='light'*/ superClick={this.redirect.bind(this)} /> :
							<BasicButton msg='next' /*color='light'*/ superClick={this.redirect.bind(this)} /> }
					</form>
				</div>
			</div>
		);
	}
}

export default UpdateContact;
