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

// Example
export const Test = () => (
	<EditContainer title='Contact Info'><EditContact /></EditContainer>
)

// Generic container for when needed as standalone component
export let EditContainer = (props) => (
	<div id='edit-container'>
		<h1>Edit {props.title}</h1>
		{props.children}
		<BasicButton msg='return'/>
	</div>
)

// Content, flexible to other containres
export class EditContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: 'bearb@umich.edu',
			phone: '815-276-4124',
		}
	}
	render() {
		return(
			<form id='edit-contact-info'>
				<div className='input-field'>
					<input type='text' id='phone-number' placeholder='815-262-4141' value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
					<label htmlFor='phone-number'>Phone</label>
				</div>
				<div className='input-field'>
					<input id='email' type='email' placeholder='bearb@umich.edu' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
					<label htmlFor='email'>Email</label>
				</div>
			</form>
		)
	}
}