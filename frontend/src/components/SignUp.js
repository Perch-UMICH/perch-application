import React, {Component} from 'react';
import {registerUser} from '../helper.js';
import './SignUp.css';
class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: '/pick-your-interests?user_type=student'
		};
	}

	handleUserTypeCheck(event) {
		if (event.target.value === 'faculty') {
			this.setState({route: '/lab-name'});
		}
		else {
			this.setState({route: '/pick-your-interests?user_type=student'});
		}
	}

	registerHandler() {
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		let name = document.getElementById('name').value;
		// alert(email)
		// alert(password)
		// alert(name)
		registerUser(name, email, password, password).then((resp) => window.location.href = this.state.route);
	}

	render() {
		return (
				<div className='container left-align new-signup-container' >
	  				<div className='new-signup-header'>Sign Up for Free</div>
	  				<a href='login' ><div className='new-signup-sub-header'>or <span className='link-color'>login</span> if you have an account</div></a>
	  				{/*<div className='row'>
	  					<div className="input-field col s6">
		                	<input id="first_name" type="text" required />
		                	<label htmlFor="first_name">First name</label>
		            	</div>
		            	<div className="input-field col s6">
			                <input id="last_name" type="text" required />
			                <label htmlFor="last_name">Last name</label>
			            </div>
	  				</div>*/}
	  				<div className="input-field">
		                <input id="name" type="text" required />
		                <label htmlFor="name">Name</label>
		            </div>  
	  				<div className="input-field">
		                <input id="email" type="email" required />
		                <label htmlFor="email">Email</label>
		            </div>
		            <div className="input-field">
		                <input id="password" type="password" required />
		                <label htmlFor="password">Password</label>
		            </div>
		            <div className='center-align'>
		            	<input className="radio" name="user_type" type="radio" id="faculty" value="faculty" onChange={this.handleUserTypeCheck.bind(this)} required />
		              	<label className='new-signup-radio' htmlFor="faculty">Faculty</label>
		              	<input className="radio" name="user_type" type="radio" id="student" value="student" onChange={this.handleUserTypeCheck.bind(this)} required />
		              	<label className='new-signup-radio' htmlFor="student">Student</label>
		            </div>
		            <br />
		            <button className="btn waves-effect waves-blue waves-light basic-btn" onClick={this.registerHandler} style={{width: '100%', textTransform: 'lowercase', height: '50px'}} name="action">deawkwardize</button>
	  			</div>
		);
	}
}

export default SignUp;