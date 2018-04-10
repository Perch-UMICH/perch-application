import React, {Component} from 'react';
import {registerUser, createStudent, getCurrentUserId, loginUser, getStudentFromUser} from '../helper.js';
import {getAllUsers, getStudent, getAllLabs, deleteUser, getAllStudents, createFaculty, createLab, addLabToFaculty } from '../helper.js'
import './SignUp.css';
class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: '/pick-your-interests?user_type=student'
		};
		getAllUsers().then(r=>console.log(r))
		getAllStudents().then(r=>console.log(r))
		getStudent(2).then(r=>console.log(r))
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

		registerUser(`${first_name} ${last_name}`, email, password, password).then((resp) => {
			this.handleLoginAndCreation();
		})
	}

	// logs user in then calls create student function
	handleLoginAndCreation() {
		let email = document.getElementById('email').value
		let password = document.getElementById('password').value

		loginUser(email, password).then((resp) => {
			this.createStudent();
		});
	}

	// relies on register and login to create a user and put id info in local storage to then create a student
	createStudent() {
		let student = document.getElementById('student').checked;
		let id = getCurrentUserId();
		let first_name = document.getElementById('first_name').value;
		let last_name = document.getElementById('last_name').value;
		let email = document.getElementById('email').value;

		if (student) {
			createStudent(id, first_name, last_name, null, null, null, null, null, null, null, null).then(resp => sessionStorage.setItem("student_id", resp.id)).then(() => window.location.href = this.state.route);
		}
		else {
			createFaculty(id, first_name, last_name, null, email).then(fac => {
				console.log(fac);
				createLab(fac.id, `${first_name} ${last_name}'s Lab`, 'Chemistry', '100 Cool Catz Dr., Lab 1003', 'uhh', null, null, null, null, null, email).then(lab => {
					addLabToFaculty(fac.id, lab.id).then(resp => {
						window.location.href = '/lab-name';
					});
				});
			});
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
