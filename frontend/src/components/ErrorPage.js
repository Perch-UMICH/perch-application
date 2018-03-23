import React, {Component} from 'react';
import './ErrorPage.css'



class ErrorPage extends Component {
	render() {
		return (
			<div className='error-page-container valign-wrapper'>
				<div className='container center-align'>
					{<img src='/assets/PERCH_MASCOT.svg' className='logo hide-on-med-and-down' style={{height: '250px'}} alt=""/>}
					<div className='error-message'><b>Not Logged In. Please <a href='/login'>login</a></b></div>
				</div>
			</div>
		);
	}
}

export default ErrorPage;