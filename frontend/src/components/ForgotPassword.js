import React, {Component} from 'react';

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
		}
	}

	componentDidMount() {
		var token = window.location.pathname.split('/')[2];
		this.setState({ token: token });
	}

	render() {
		return (
			<div className='error-page-container valign-wrapper'>
				<div className='container center-align'>
					{<img src='/assets/PERCH_MASCOT.svg' className='logo hide-on-med-and-down' style={{height: '250px'}} alt=""/>}
						<div className='error-message'><b>You forgot your passord. <br/> Here's your token: {this.state.token} </b></div>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;