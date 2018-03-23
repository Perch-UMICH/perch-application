import React, {Component} from 'react';
import {registerUser} from '../helper.js';
import {createStudent} from '../helper.js';
import {createFaculty} from '../helper.js';
import $ from 'jquery';
import './SignUp.css';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_type: 'student',
		};
		this.handleUserTypeCheck = this.handleUserTypeCheck.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	handleUserTypeCheck(event) {
		if (event.target.value === 'faculty') {
			this.setState({
				user_type: 'faculty',
			});
		}
		else {
			this.setState({
				user_type: 'student',
			});
		}
	}

	signUp(event) {
		//registerUser("_", $('#email').val(), $('#password').val(), $('#password').val()).then((resp) => {
			var user_id = 177; // SET TO USER_ID FROM RESP
			if (this.state.user_type === 'student') {
				createStudent(user_id, $('#first_name').val(), $('#last_name').val(), "cool", "cool", "cool", $('#email').val()).then(resp => {
					window.location = '/student-profile';
				});
			} else {
				createFaculty(user_id, $('#first_name').val(), $('#last_name').val(), "cool", "cool", $('#email').val()).then(resp => {
					window.location = '/prof-page';
				});
			}
		//});
	}

	render() {
		return (
			<div className='container left-align new-signup-container'>
				<form>
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
		            	<input className="radio" name="user_type" type="radio" id="faculty" value="faculty" onChange={this.handleUserTypeCheck} required />
		              	<label className='new-signup-radio' htmlFor="faculty">Faculty</label>
		              	<input className="radio" name="user_type" type="radio" id="student" value="student" onChange={this.handleUserTypeCheck} required />
		              	<label className='new-signup-radio' htmlFor="student">Student</label>
		            </div>
	  			</form>
	  			<br/>
	  			<button className="btn waves-effect waves-blue waves-light basic-btn" style={{width: '100%', textTransform: 'lowercase', height: '50px'}} onClick={this.signUp}>deawkwardize</button>
	  		</div>
		);
	}
}

export default SignUp;