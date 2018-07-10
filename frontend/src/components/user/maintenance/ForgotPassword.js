import React, {Component} from 'react';
import alertify from 'alertify.js';
import iziToast from 'izitoast';
import BasicButton from '../../utilities/buttons/BasicButton';
import './ForgotPassword.css'

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			on_screen: ''
		}
		this.invalidToken = this.invalidToken.bind(this);
		this.validToken = this.validToken.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	componentDidMount() {
		// var token = window.location.pathname.split('/')[2];
		// this.setState({ token: token });

		let token = 'token';

		// USE FUNCTION FROM AKSHAY TO VALIDATE TOKEN
		let check = 'token'
		if (token === check) {
			let screen = this.validToken();
			this.setState({on_screen: screen})
		}
		else {
			let screen = this.invalidToken();
			this.setState({on_screen: screen});
		}
	}



	resetPassword(event) {
		console.log('implement reset password!!');

		let password = '';
		let confirm_password = '';
		if (document.getElementById('new_password')) {
			let len = document.getElementById('new_password').value.length;
			if (len !== 0) {
				password = document.getElementById('new_password').value;
			}
		}
		
		if (document.getElementById('new_password_conf')) {
			let len = document.getElementById('new_password_conf').value.length;
			if (len !== 0) {
				confirm_password = document.getElementById('new_password_conf').value;
			}
		}

		if (password !== confirm_password) {
			// alertify.error("Passwords Do Not Match");
			iziToast.show({
				    title: 'Error',
				    titleColor: 'white',
				    messageColor: 'white',
				    message: 'Passwords Do Not Match',
				    color: 'red',
				    position: 'bottomLeft',
				    progressBarColor: 'white',
				});
		}
		else {
			console.log('update user information');
		}
	}

	validToken() {
		return (
			<div>
				<div className='forgot-password-form container shift-down center-align'>
			 		<div className="modal-content">
			 			<h1 className="forgot-password-heading center-align"> Reset Password </h1>
			 			<p className="above-input center-align"> Enter and confirm your desired new password below, then click update. </p>
          				<div className="input-field narrow">
        	                <input id="new_password" type="password" required />
        	                <label htmlFor="new_password">New Password</label>
        	            </div>
          				<div className="input-field narrow">
        	                <input id="new_password_conf" type="password" required />
        	                <label htmlFor="new_password_conf">New Password Confirmation</label>
        	            </div>
				   	</div>
				   	<div className="modal-footer">
				     	<BasicButton superClick={this.resetPassword} msg='update' />
				  	</div>
			 	</div>
			</div>
		);
	}

	invalidToken() {
		return (
			<div className='error-page-container valign-wrapper'>
				<div className='container center-align'>
					{<img src='/assets/PERCH_MASCOT.svg' className='logo hide-on-med-and-down' style={{height: '250px'}} alt=""/>}
						<div className='error-message'><b>You forgot your password. <br/> Here's your token: {this.state.token} </b></div>
				</div>
			</div>
		);
	}

	render() {
		return (this.state.on_screen);
	}
}

export default ForgotPassword;