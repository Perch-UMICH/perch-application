import React, {Component} from 'react';
import {isLoggedIn, getCurrentUserId} from '../helper.js'
import './BioTab.css';

class BioTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: (this.props.user_type === 'faculty') ? '/update-lab-description' : '/update-student-bio',
			id: window.location.pathname.split('/')[2],
		};
	}

	render() {
		return (
			<div className='tab-container shadow'>
				<div className='tab-header'>
					{this.props.header.toUpperCase()}
					{getCurrentUserId() === this.state.id && 
						<a href={this.state.dest}><i className="material-icons interest-editor edit-icon">create</i></a>
					}
				</div>
				<div className='bio-tab'>
					{this.props.msg}
				</div>
			</div>
		);
	}
}

export default BioTab;