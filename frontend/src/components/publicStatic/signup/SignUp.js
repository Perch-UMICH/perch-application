import React, {Component} from 'react';
import {registerUser, createStudent, getCurrentUserId, loginUser, getStudentFromUser} from '../../../helper.js';
import {getAllUsers, getStudent, getAllLabs, deleteUser, getAllStudents, createFaculty, createLab, addMembersToLab, /*addLabToFaculty*/ getAllFaculties } from '../../../helper.js'
import './SignUp.css';
class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: '/student-onboarding'
		};
		getAllUsers().then(r=>console.log(r))
		getAllStudents().then(r=>console.log(r))
		getAllLabs().then(r=>console.log(r))
		getAllFaculties().then(r=>console.log(r))
	}

	generalHandler(event) {
		event.preventDefault();
		let email = document.getElementById('email').value;
		let password = document.getElementById('password').value;
		let first_name = document.getElementById('first_name').value;
		let last_name = document.getElementById('last_name').value;

		registerUser(`${first_name} ${last_name}`, email, password, password)
			.catch(e => alert('Register Error'))
			.then(r => loginUser(email, password))
			.catch(e => alert('Login Error'))
			.then(r => this.createAccount(email, first_name, last_name))
	}

	// relies on register and login to create a user and put id info in local storage to then create a student
	createAccount(email, first_name, last_name) {
		let student = document.getElementById('student').checked;
		let id = getCurrentUserId();
		let individual = {
			first_name: first_name,
			last_name: last_name,
			contact_email: email,
		}
		if (student) {
			createStudent(id, individual)
				.then(r => {
					console.log("CREATE STUDENT RESP", r)
					alert('STUDENT CREATED')
					window.location.href = '/student-onboarding'
				})
				.catch(e => alert('ERROR in student creation'))
		}
		else {
			console.log('Faculty creation section');
			createFaculty(id, individual)
				.then(r => {
					console.log("CREATE FAC RESPONSE", r)
					alert("FACULTY CREATED")
					window.location.href = '/faculty-onboarding'
				})


			// createFaculty(id, first_name, last_name, null, email).then(fac => {
			// 	createLab(fac.id, `${first_name} ${last_name}'s Lab`, null, null, null, null, null, null, null, null, email).then(lab => {
			// 		addMembersToLab(lab.id,[fac.id],[1]).then(resp => {
			// 			window.location.href = '/faculty-onboarding'
			// 		});
			// 		// TODO TEMPORARILY NOT WORKING FROM API UPDATE
			// 		// addLabToFaculty(fac.id, lab.id).then(resp => {
			// 		// 	window.location.href = this.state.route;
			// 		// });
			// 	});
			// });
		}
	}

	render() {
		return (
				<form className='container left-align new-signup-container' onSubmit={this.generalHandler.bind(this)}>
	  				<div className='new-signup-header'>Sign Up for Free</div>
	  				<a href='login' ><div className='new-signup-sub-header'>or <span className='link-color'>login</span> if you have an account</div></a>
	  				<div className='row'>
	  					<div className="input-field col s6">
		                	<input id="first_name" type="text" required autofocus="autofocus"/>
		                	<label htmlFor="first_name">First name</label>
		            	</div>
		            	<div className="input-field col s6">
			                <input id="last_name" type="text" required autofocus="autofocus"/>
			                <label htmlFor="last_name">Last name</label>
			            </div>
	  				</div>
	  				<div className="input-field">
		                <input id="email" type="email" required autofocus="autofocus"/>
		                <label htmlFor="email">Email</label>
		            </div>
		            <div className="input-field">
		                <input id="password" type="password" required autofocus="autofocus"/>
		                <label htmlFor="password">Password</label>
		            </div>
		            <div className='center-align'>
		            	<input className="radio" name="user_type" type="radio" id="faculty" value="faculty" required autofocus="autofocus"/>
		              	<label className='new-signup-radio' htmlFor="faculty">Faculty</label>
		              	<input className="radio" name="user_type" type="radio" id="student" value="student" required autofocus="autofocus"/>
		              	<label className='new-signup-radio' htmlFor="student">Student</label>
		            </div>
		            <br />
		            <button className="btn waves-effect waves-blue waves-light basic-btn" style={{width: '100%', textTransform: 'lowercase', height: '50px'}} >deawkwardize</button>
	  			</form>
		);
	}
}

export default SignUp;
