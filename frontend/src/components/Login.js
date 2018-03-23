import React, {Component} from 'react';
import './Login.css';
import {isLoggedIn, loginUser} from '../helper.js';
import alertify from 'alertify.js'

class Login extends Component {

	handleLogin() {
		let email = document.getElementById('email').value
		let password = document.getElementById('password').value

		loginUser(email, password).then((resp)=>{
			if (resp) {
				window.location.href = '/student-profile'
			}
			else {
				alertify.error("Incorrect Username and Password");
			}
		});

	}


	render() {
		return (
			<div className='login-container valign-wrapper'>
				<div className='container login shadow'>
					<div className='new-signup-header center-align'>LOG IN</div>
					<div className="input-field">
		                <input id="email" type="email" required />
		                <label htmlFor="email">Email</label>
		            </div>
		            <div className="input-field">
		                <input id="password" type="password" required />
		                <label htmlFor="password">Password</label>
		            </div>
		            <br />
		            <button onClick={this.handleLogin} className="btn waves-effect waves-blue waves-light basic-btn" style={{width: '100%', height: '50px'}} name="action"><i className='material-icons'>lock_open</i></button>
				</div>
			</div>
		);
	}
}

export default Login;