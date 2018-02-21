import React, {Component} from 'react';
import './InterestsTab.css';

class InterestsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			interests: [
				"Computer Security",
				"Machine Learning",
				"Software Development",
				"Medicine",
				"Pen Testing",
				"Web Development",
			]
		}
	}

	render() {
		return (
			<div>
				<div className='tab-header'>
					{this.props.tabTitle} <a href='/pick-your-interests'><i className="material-icons interest-editor">add</i></a>
				</div>
				<div className='interests-tab'>
					{this.state.interests.map((interest) => <div key={interest} className='floater-item'>{interest}</div>)}
				</div>
			</div>
		);
	}
}

export default InterestsTab;