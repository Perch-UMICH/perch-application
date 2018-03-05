import React, {Component} from 'react';
import SignUp from './SignUp.js';
import LoginButtons from './LoginButtons.js';
import './Login.css'
class Login extends Component {
	render() {
		return (
			<div className='login-container valign-wrapper'>
				<form className='container login shadow' action='student-profile'>
					<div className='new-signup-header center-align'>Log In</div>
					<div className="input-field">
		                <input id="email" type="email" required />
		                <label htmlFor="email">Email</label>
		            </div>
		            <div className="input-field">
		                <input id="password" type="password" required />
		                <label htmlFor="password">Password</label>
		            </div>
		            <br />
		            <button className="btn waves-effect waves-blue waves-light basic-btn" style={{width: '100%', height: '50px'}} name="action"><i className='materialize-icons'>key</i></button>
				</form>
			</div>
		);
	}
}

export default Login;