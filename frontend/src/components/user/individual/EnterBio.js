import React, {Component} from 'react';
import {EditContainerOnboarding, EditBio} from './StudentEditors.js'

class EnterBio extends Component {
	constructor(props) {
		super(props);
	}

	redirect() {
		window.location = '/upload-image';
	}

	render() {
		return (
			<EditContainerOnboarding title="Bio" redirect={this.redirect.bind(this)}>
				<EditBio />
			</EditContainerOnboarding>
		);
	}
}

export default EnterBio;


