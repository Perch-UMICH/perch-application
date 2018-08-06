import React, {Component} from 'react';
import UpdateContact from '../maintenance/UpdateContact'
import {EditContainerOnboarding, EditContact} from './StudentEditors.js'

class EnterContact extends Component {
	constructor(props) {
		super(props);
	}

	redirect() {
		window.location = '/lab-skills';
	}

	render() {
		return (
			<EditContainerOnboarding title="Contact Information" redirect={this.redirect.bind(this)}>
				<EditContact noEmail={true} updateUser={this.props.updateUser} user={this.props.user}/>
			</EditContainerOnboarding>
		);
	}
}

export default EnterContact;
