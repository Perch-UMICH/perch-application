import React, {Component} from 'react';
import MoveTo from 'moveto';
import Typed from 'typed.js';
import BasicButton from './BasicButton';
import './AboveTheFold.css';

class AboveTheFold extends Component {

	constructor(props) {
		super(props);
		this.state = {
			route: '/pick-your-interests?user_type=student'
		};
	}

	componentDidMount() {
		var options = {
		  strings: ["research", "finding a lab", "finding lab assistants", "learning lab skills", "making an impact", "research"],
		  typeSpeed: 75
		}

		var typed = new Typed("#atf-changer", options);
	}

	handleUserTypeCheck(event) {
		if (event.target.value === 'faculty') {
			this.setState({route: '/lab-name'});
		}
		else {
			this.setState({route: '/pick-your-interests?user_type=student'});
		}
	}

	render() {
		return(
			  <div className="atf row">
			  		<div className='col s7 atf-height valign-wrapper' style={{ backgroundColor: 'white'}}>
			  			<div className='container center-align'>
				  			<div className='atf-header-big left-align'><span id='atf-perch'>PERCH</span></div>
				  			<div className='atf-header left-align'>deawkwardizing <br/><span id='atf-changer'></span></div>
				  			<div className='atf-text left-align'>PERCH's centralized matching system helps you find the best lab or lab assistant, while PERCH Certifications streamlines basic skills training</div>
			  			</div>
			  		</div>

			  		<div className='col s5 atf-height valign-wrapper' style={{ backgroundColor: 'white'}}>
			  			<form className='container left-align new-signup-container' action={this.state.route}>
			  				<div className='new-signup-header'>Sign Up for Free</div>
			  				<div className="input-field">
				                <input id="email" type="email" required />
				                <label htmlFor="email">Email</label>
				            </div>
				            <div className="input-field">
				                <input id="password" type="password" required />
				                <label htmlFor="password">Password</label>
				            </div>
				            <div className='center-align'>
				            	{/*Fix onChange for handling*/}
				            	<input className="radio" name="user_type" type="radio" id="faculty" value="faculty" onChange={this.handleUserTypeCheck.bind(this)} required />
				              	<label className='new-signup-radio' htmlFor="faculty">Faculty</label>
				              	<input className="radio" name="user_type" type="radio" id="student" value="student" onChange={this.handleUserTypeCheck.bind(this)} required />
				              	<label className='new-signup-radio' htmlFor="student">Student</label>
				            </div>
				            <br />
				            <button className="btn waves-effect waves-blue waves-light basic-btn" style={{width: '100%', textTransform: 'lowercase', height: '50px'}} name="action">deawkwardize</button>
			  			</form>
			  		</div>
			    {/*<div className="container center-align shadow" style={{backgroundColor: '#eee'}}>
			    				    <img className="logo" src="assets/new-logo-clear.png" data-tilt />
			    				    <SquareLogo />
			    				    <p className="letter-spacer flow-text" style={{color: '#0277bd'}}>We make research more accessible for everyone</p>
			    				    <LoginButtons  />		    
			    			    </div>*/}
			  </div>
		);
	}
}

export default AboveTheFold;

//<a href="#form" id="join-btn" className="waves-effect btn-flat btn-large js-trigger" data-mt-duration="300">join perch</a>