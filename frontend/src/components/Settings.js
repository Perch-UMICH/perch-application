// Text gathering component for both lab-name and lab-description pages

import React, {Component} from 'react';
import BasicButton from './BasicButton';
import {getStudent, isLoggedIn, getCurrentUserId, verifyLogin} from '../helper.js'
import './Settings.css';

class LabTextInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "Someone",
			email: "Someone@something.com",
			user_type: "Faculty",
		};
	}

	componentDidMount() {
		if (isLoggedIn()) {
			getCurrentUserId().then((resp) => {
				console.log(resp);
				this.setState(
					{
						name: "Someone",
						email: "Someone@something.com",
						user_type: "Faculty",
					}
				);
			});
		}
		
	}

	render() {
		return (
			<div className='lab-text-info shift-down'>
				<div className='container center-align lab-text-info-form shadow'>
					<div className='lab-text-info-header'>Settings</div>
					<div className='row'>
						<div className='container col m4 s4 l4 setting-col'>
							<i class="material-icons setting-icon">mail outline</i>
							<BasicButton icon='mail outline' msg='reset email'/>
						</div>
						<div className='container col m4 s4 l4 setting-col'>
							<i class="material-icons setting-icon">lock outline</i>
							<BasicButton icon='lock outline' msg='reset password'/>
						</div>
						<div className='container col m4 s4 l4 setting-col'>
							<i class="material-icons setting-icon">remove circle</i>
							<BasicButton icon='remove circle' msg='delete account'/>
						</div>
					</div>
					<div className='container user-information'> 
						<b>Current User Information</b> <br/>
						Name: {this.state.name} <br/>
						Email: {this.state.email} <br/>
						User Type: {this.state.user_type} <br/>
					</div>
				</div>
			</div>
		);
	}
}

export default LabTextInfo;