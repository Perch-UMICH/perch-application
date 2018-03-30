import React, {Component} from 'react';
import {registerUser, createStudent, getCurrentUserId, loginUser} from '../helper.js';
import {getAllUsers, deleteUser, getAllStudents} from '../helper.js'
import './SignUp.css';
class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: '/pick-your-interests?user_type=student'
		};

		getAllUsers().then((resp) => {
			// for (let i = 6; i < resp.result.length; i++) {
			// 	deleteUser(i);
			// }
			console.log(resp.result)

		})

		getAllStudents().then((resp) => {
			// for (let i = 6; i < resp.result.length; i++) {
			// 	deleteUser(i);
			// }
			console.log(resp.result)

		})
		
	}

	handleUserTypeCheck(event) {
		if (event.target.value === 'faculty') {
			this.setState({route: '/lab-name'});
		}
		else {
			this.setState({route: '/pick-your-interests?user_type=student'});
		}
	}

	// Called when form submits
	registerHandler(event) {
		event.preventDefault();
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		let first_name = document.getElementById('first_name').value;
		let last_name = document.getElementById('last_name').value;

		registerUser(`${first_name} ${last_name}`, email, password, password).then(this.handleLoginAndCreation.bind(this))//.then((resp) => window.location.href = this.state.route);
	}

	// logs user in then calls create student function
	handleLoginAndCreation() {
		let email = document.getElementById('email').value
		let password = document.getElementById('password').value

		loginUser(email, password).then(this.createStudent.bind(this)).then((resp) => window.location.href = this.state.route);
	}

	// relies on register and login to create a user and put id info in local storage to then create a student
	createStudent() {
		let student = document.getElementById('student').checked;
		let id = getCurrentUserId();
		let first_name = document.getElementById('first_name').value;
		let last_name = document.getElementById('last_name').value;
		
		if (student) {
			createStudent(id, first_name, last_name, null, null, null, null, null, null, null)
		}
		else {
			alert('not student')
		}
	}

	render() {
		return (
				<form className='container left-align new-signup-container' onSubmit={this.registerHandler.bind(this)}>
	  				<div className='new-signup-header'>Sign Up for Free</div>
	  				<a href='login' ><div className='new-signup-sub-header'>or <span className='link-color'>login</span> if you have an account</div></a>
	  				<div className='row'>
	  					<div className="input-field col s6">
		                	<input id="first_name" type="text" required />
		                	<label htmlFor="first_name">First name</label>
		            	</div>
		            	<div className="input-field col s6">
			                <input id="last_name" type="text" required />
			                <label htmlFor="last_name">Last name</label>
			            </div>
	  				</div>
	  				{/*
	  				<div className="input-field">
		                <input id="first_name" type="text" required />
		                <label htmlFor="first_name">Name</label>
		            </div>
		            <div className="input-field">
		                <input id="last_name" type="text" required />
		                <label htmlFor="last_name">Name</label>
		            </div>   */}
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
		            <button className="btn waves-effect waves-blue waves-light basic-btn" style={{width: '100%', textTransform: 'lowercase', height: '50px'}} >deawkwardize</button>
	  			</form>
		);
	}
}

export default SignUp;