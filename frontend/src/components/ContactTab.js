import React, {Component} from 'react';
import {getCurrentUserId, getCurrentLabId, getCurrentStudentId, isLab, isStudent, permissionCheck} from '../helper'
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
			<div className='tab-container'>
				<div className='tab-header' style={{fontSize: '16px', padding: '15px 10px'}}>
					{this.props.header.toUpperCase()}
					{ permissionCheck() && 
						<a href={this.state.dest}><i className="material-icons interest-editor edit-icon">create</i></a>
					}
				</div>
				<div className='contact-tab'>
					{this.props.contact_info.map((item) => <div key={item.value}>{`${item.value}`}</div>)}
				</div>
			</div>
		);
	}
}

export default ContactTab;