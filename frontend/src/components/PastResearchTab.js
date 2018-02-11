import React, {Component} from 'react';
import './PastResearchTab.css';

class PastResearchTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='tab-header'>PAST RESEARCH</div>

				<div className='past-research-tab center-align'>
					<ul>
						<li>Dr. Patil's Neurosurgery Lab</li>
						<li>Dr. R's Pharmaceutics Lab</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default PastResearchTab;