import React, {Component} from 'react';
import Presentation from './Presentation'
import './SignUpPage.css'
class SignUpPage extends Component {
	
	render() {
		return(
			<div className='sign-up-page-container valign-wrapper'>
				<div className='container sign-up-page shadow'>
					<SignUp />
				</div>
			</div>
		);
	}
}

export default SignUpPage;