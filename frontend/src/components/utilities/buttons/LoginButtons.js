import React, {Component} from 'react';
import './LoginButtons.css';
class LoginButtons extends Component {
	constructor(props) {
		super(props);
	}

	inputCSS = {
		borderRadius: '40px',
		backgroundColor: 'white',
		color: 'grey',
		paddingLeft: '10px',
		margin: ' 0px 10px',
		height: '30px'
	}

	render() {
		return(
			<form className='container'>
				<form className='row' action='prof-page'>
					<div className='input-field col s12 m5'>
						<input id='username_login' type="email" placeholder='username' className='validate shadow' style={this.inputCSS} required />
					</div>
					<div className='input-field col s12 m5'>
						<input id='password_login' type="password" placeholder='password' className='validate shadow' style={this.inputCSS} required />
					</div>
					<div className='col s12 m2  center-align'>
			        	<button className="btn waves-effect waves-light submit-btn"
			        			type="submit" 
			        			name="action"
			        			style={{marginTop: '10px', marginLeft: '15px', backgroundColor: 'rgb(41, 182, 246)'}}
			        		>Login
			        	</button>
		        	</div>
				</form>
			</form>
		);
	}

}

export default LoginButtons;