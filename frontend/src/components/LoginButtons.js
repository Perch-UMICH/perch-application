import React, {Component} from 'react';
import './LoginButtons.css';
class LoginButtons extends Component {
	render() {
		return (
			  	<div className="shadow container row white">
				    <form className="col s12">
				      <div className="row">
				        <div className="input-field col s5">
				          <i className="material-icons prefix blue-text">account_circle</i>
				          <input id='username_login' type="email" className="validate login-buttons" required />
				          <label htmlFor="username_login">Username</label>
				        </div>
				        <div className="input-field col s5">
				          <i className="material-icons prefix blue-text">security</i>
				          <input id="password_login" type="password" className="validate login-buttons" required />
				          <label htmlFor="password_login">Password</label>
				        </div>
				        <div className='col s2 valign-wrapper'>
				        	<button className="btn waves-effect waves-light submit-btn"
				        			type="submit" 
				        			name="action"
				        			style={{marginTop: '22px'}}
				        		>Login
				        	</button>
				        </div>
				      </div>
				    </form>
  				</div>
		);
	}
}

export default LoginButtons;