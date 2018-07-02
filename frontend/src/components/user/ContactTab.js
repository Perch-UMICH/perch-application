import React, {Component} from 'react';
import {getCurrentUserId, getCurrentLabId, getCurrentStudentId, isLab, isStudent, permissionCheck} from '../../helper'
import './ContactTab.css';

class ContactTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '/update-contact',
		};
	}

	render() {
		return (
			<div className='tab-container-L'>
				<h1 id='contact-tab-header'>
					{this.props.header.toUpperCase()}
					{ permissionCheck() && 
						<a href={this.state.dest}><i id='contact-editor' className="material-icons edit-icon">create</i></a>
					}
				</h1>
				<div className='contact-tab'>
					{this.props.contact_info.map((item) => <div key={item.value}>{`${item.value}`}</div>)}
				</div>
			</div>
		);
	}
}

export default ContactTab;