import React, {Component} from 'react';
import './BioTab.css';

class BioTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '/update-student-bio'
		};
		if (this.props.user_type === 'faculty') {
			this.state.dest = '/update-lab-description';
		}
	}

	render() {
		return (
			<div className='tab-container'>
				<div className='tab-header'>
					{this.props.header.toUpperCase()}
					<a href={this.state.dest}><i className="material-icons interest-editor edit-icon">create</i></a>
				</div>
				<div className='bio-tab'>
					{this.props.msg}
				</div>
			</div>
		);
	}
}

export default BioTab;