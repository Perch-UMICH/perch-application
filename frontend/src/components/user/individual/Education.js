import React, {Component} from 'react';
import {EditContainerOnboarding, EditExperience} from './StudentEditors.js'

class Education extends Component {
	constructor(props) {
		super(props);
	}

	redirect() {
		window.location = '/links';
	}

	render() {
		return (
			<EditContainerOnboarding title="Education" redirect={this.redirect.bind(this)}>
				<EditExperience type="educ" />
			</EditContainerOnboarding>
		);
	}
}

export default Education;
