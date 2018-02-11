import React, {Component} from 'react';
import SignUp from './SignUp.js';
import LoginButtons from './LoginButtons.js';
class Login extends Component {
	render() {
		return (
			<div className='shift-down'>
				<SignUp />
			</div>
		);
	}
}

export default Login;