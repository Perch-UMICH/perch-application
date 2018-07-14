import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import {EditContainer} from '../individual/StudentEditors'
import '../individual/StudentEditors.css';

export class ExternalLinkEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			linkedin: "linkedin.com",
			resume: "hostedpdf.pdf",
			website: "github.io",
		}
	}
	render() {
		return(
			<form id='edit-links-tab'>
				<div className='input-field'>
					<input type='text' id='linkedin' placeholder='linkedin.com' value={this.state.linkedin} onChange={(e) => this.setState({linkedin: e.target.value})}/>
					<label htmlFor='linkedin'>LinkedIn</label>
				</div>
				<div className='input-field'>
					<input type='text' id='resume' placeholder='resume.pdf' value={this.state.resume} onChange={(e) => this.setState({resume: e.target.value})}/>
					<label htmlFor='resume'>Resume</label>
				</div>
				<div className='input-field'>
					<input type='text' id='website' placeholder='github.io' value={this.state.website} onChange={(e) => this.setState({website: e.target.value})}/>
					<label htmlFor='website'>Website</label>
				</div>
			</form>
		)
	}
}

export const Test = () => (
        <EditContainer title='External Links'><ExternalLinkEditor /></EditContainer>
)