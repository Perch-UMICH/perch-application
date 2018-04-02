import React, {Component} from 'react';
import {getCurrentUserId} from '../helper.js'
import './PastResearchTab.css';

class PastResearchTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: window.location.pathname.split( '/' )[2],
		}
	}

	render() {
		return (
			<div className='tab-container' style={{position: 'relative', height: '70%'}}>
				<div className='tab-header'>
					PAST RESEARCH
					{ getCurrentUserId() == this.state.id && 
						<a href='/update-past-research'><i className="material-icons interest-editor edit-icon">create</i></a>
					}
				</div>
				<div className='valign-wrapper' style={{position: 'relative', height: '100%'}}>
					<div className='past-research-tab container center-align'>
						<pre>
						{this.props.past_research}
						</pre>
					</div>
				</div>
			</div>
		);
	}
}

export default PastResearchTab;