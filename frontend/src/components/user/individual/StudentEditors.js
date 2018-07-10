import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import './StudentEditors.css';


export class EditBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bio: 'Four score and seven years ago',
		}
	}
	render() {
		return(
			<div id='edit-container'>
				<form id='edit-bio'>
					<h1>Edit Bio</h1>
					<textarea placeholder='Four score and seven years ago ... ' onChange={(bio) => this.setState({bio: bio})}>{this.state.bio}</textarea>
				</form>
				<BasicButton msg='return'/>
			</div>
		)
	}
}

export class EditContactInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: 'bearb@umich.edu',
			phone: '815-276-4124',
		}
	}
	render() {
		return(
			<div id='edit-container'>
				<form id='edit-contact-info'>
					<h1>Edit Contact Info</h1>
					<input placeholder='815-262-4141' value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
					<input type='email' placeholder='bearb@umich.edu' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
				</form>
				<BasicButton msg='return'/>
			</div>
		)
	}
}