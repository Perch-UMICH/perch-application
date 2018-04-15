import React, {Component} from 'react';
import {isLoggedIn, getCurrentUserId, permissionCheck} from '../helper.js'
import shave from 'shave'
import './BioTab.css';

class BioTab extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			dest: (this.props.user_type === 'faculty') ? '/update-lab-description' : '/update-student-bio',
			id: window.location.pathname.split('/')[2],
		};
	}

	// Shaves bio if too long
	componentDidUpdate() {
		shave('.bio-tab-shave', 100)
	}

	handleShave() {
		document.getElementById('bio-tab-small').classList.toggle('hide')
		document.getElementById('bio-tab-large').classList.toggle('hide')
		let toggler = document.getElementById('bio-toggler');
		if (toggler.innerHTML === 'arrow_drop_up')
			toggler.innerHTML = 'arrow_drop_down'
		else
			toggler.innerHTML = 'arrow_drop_up'
	}

	render() {
		return (
			<div id='bio-tab-container' className='tab-container shadow'>
				<div className='tab-header'>
				{this.props.header.toUpperCase()}
					<div className='editors'>
						{permissionCheck() && 
							<a href={this.state.dest}><i id='bio-editor' className="material-icons edit-icon">create</i></a>
						}
						<i id='bio-toggler' className="material-icons bio-toggler edit-icon" onClick={this.handleShave.bind(this)}>arrow_drop_down</i>
					</div>
				</div>
				<div id='bio-tab-small' className='bio-tab-shave bio-tab'>
					{this.props.msg}
				</div>
				<div id='bio-tab-large' className='bio-tab hide'>
					{this.props.msg}
				</div>
			</div>
		);
	}
}

export default BioTab;