// Text gathering component for both lab-name and lab-description pages
import React, {Component} from 'react';
import BasicButton from './BasicButton';
import ResetEmailModal from './ResetEmailModal';
import ResetPasswordModal from './ResetPasswordModal';
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin, getUser} from '../helper.js'
import './Settings.css';
import $ from 'jquery';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "Someone",
			email: "Someone@something.com",
			user_type: "Faculty",
		};
		this.openEmailModal = this.openEmailModal.bind(this);
		this.openPasswordModal = this.openPasswordModal.bind(this);
	}

	componentDidMount() {
		if (isLoggedIn()) {
			getUser(getCurrentUserId()).then((resp) => {
				console.log(resp);
				this.setState(
					{
						name: resp.result.name,
						email: resp.result.email,
						user_type: resp.result.is_student ? "Student" : "Facutly",
					}
				);
			});
		}
	}

	openEmailModal() { // superClick
		$("#resetEmail").fadeIn("slow");
        $("#modalBackdrop").fadeIn("slow");
	}

	openPasswordModal() { // superClick
		$("#resetPassword").fadeIn("slow");
        $("#modalBackdrop").fadeIn("slow");
	}

	render() {
		return (
			<div>
				<ResetEmailModal />
				<ResetPasswordModal />
				<div id="modalBackdrop"></div>
				<div className='lab-text-info shift-down'>
					<div className='container center-align lab-text-info-form shadow'>
						<div className='lab-text-info-header'>Settings</div>
						<div className='row'>
							<div className='container col m4 s4 l4 setting-col'>
								<i className="material-icons setting-icon">mail outline</i>
								<BasicButton icon='mail outline' superClick={this.openEmailModal} msg='reset email'/>
							</div>
							<div className='container col m4 s4 l4 setting-col'>
								<i className="material-icons setting-icon">lock outline</i>
								<BasicButton icon='lock outline' superClick={this.openPasswordModal} msg='reset password'/>
							</div>
							<div className='container col m4 s4 l4 setting-col'>
								<i className="material-icons setting-icon">remove circle</i>
								<BasicButton icon='remove circle' msg='delete account'/>
							</div>
						</div>
						<div className='container user-information'> 
							<b>Current User Information</b> <br/>
							Name: {this.state.name} <br/>
							Email: {this.state.email} <br/>
							User Type: {this.state.user_type} <br/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Settings;