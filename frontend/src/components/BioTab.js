import React, {Component} from 'react';
import {isLoggedIn} from '../helper.js'
import './BioTab.css';

class BioTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: (this.props.user_type === 'faculty') ? '/update-lab-description' : '/update-student-bio',
		};
	}

	render() {
		return (
			<div className='tab-container shadow'>
				<div className='tab-header'>
					{this.props.header.toUpperCase()}
					{isLoggedIn() &&
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