import React, {Component} from 'react';
import './ErrorPage.css'



class ErrorPage extends Component {
	render() {
		return (
			<div className='error-page-container valign-wrapper'>
				<div className='container center-align'>
					<b>Not Logged In</b>
				</div>
			</div>
		);
	}
}

export default ErrorPage;