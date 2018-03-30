import React, {Component} from 'react';
import {isLoggedIn} from '../helper.js'
import './InterestsTab.css';

class InterestsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var route = '/update-interests?user_type=' + this.props.user_type;
		return (
			<div className='tab-container'>
				<div className='tab-header'>
					{this.props.tabTitle} 
					{/*{ isLoggedIn() &&*/}
						<a href={route} ><i className="material-icons interest-editor">add</i></a>
					{}
				</div>
				<div className='interests-tab'>
					{this.props.interests.map((interest) => <div key={interest.id} className='floater-item'>{interest.name}</div>)}
				</div>
			</div>
		);
	}
}

export default InterestsTab;