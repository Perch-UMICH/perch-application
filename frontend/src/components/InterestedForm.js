import React, {Component} from 'react';

import './InterestedForm.css';

class InterestedForm extends Component {
	render() {
		return (
			  <div id="interested-form" className="sub-team-header-2-full center-align valign-wrapper">
			      <div className="input-form container grey lighten-5 z-depth-3" >
			      <div className="container">
			        <div className="form-header center-align grey-text text-darken-3">Interested?</div>
			        <div className="row">
			          <form className="col s12">
			            <div className="row">
			              <div className="input-field col s6">
			                <input id="first_name" type="text" className="validate" required />
			                <label htmlFor="first">First Name</label>
			              </div>
			              <div className="input-field col s6">
			                <input id="last_name" type="text" className="validate" required />
			                <label htmlFor="last_name">Last Name</label>
			              </div>
			            </div>
			            <div className="row">
			              <div className="input-field col s12">
			                <input id="email" type="email" className="validate" required />
			                <label htmlFor="email">Email</label>
			              </div>
			            </div>
			              <input className="radio" name="user-type" type="radio" id="faculty" required />
			              <label htmlFor="faculty">Faculty</label>
			              <input className="radio" name="user-type" type="radio" id="student" required />
			              <label htmlFor="student">Student</label>
			            <div className="submit-container row center-align">
			              <button className="btn waves-effect waves-light submit-btn" type="submit" name="action">Submit
			                <i className="material-icons right">send</i>
			              </button>
			            </div>
			          </form>
			        </div>
			        </div>
			      </div>
			  </div>
		);
	}
}

export default InterestedForm;