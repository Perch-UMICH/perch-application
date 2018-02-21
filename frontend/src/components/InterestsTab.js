import React, {Component} from 'react';
import './InterestsTab.css';

class InterestsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='tab-header'>
					{this.props.tabTitle} <a href='/pick-your-interests'><i className="material-icons interest-editor">add</i></a>
				</div>
				<div className='interests-tab'>
					<div className='floater-item'>Computer Security</div>
					<div className='floater-item'>Machine Learning</div>
					<div className='floater-item'>Software Development</div>
					<div className='floater-item'>Medicine</div>
					<div className='floater-item'>Pen Testing</div>
					<div className='floater-item'>Web Development</div>
				</div>
			</div>
		);
	}
}

export default InterestsTab;