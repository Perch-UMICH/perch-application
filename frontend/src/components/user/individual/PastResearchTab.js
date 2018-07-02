import React, {Component} from 'react';
import {getCurrentUserId} from '../../../helper.js'
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
			<div className='tab-container-L'>
				<h1>
					RESEARCH
					{ getCurrentUserId() == this.state.id && 
						<a href='/update-past-research'><i id='past-research-tab-editor' className="material-icons edit-icon">create</i></a>
					}
				</h1>
				<div style={{position: 'relative', height: '100%'}}>
					<div className='past-research-tab left-align'>
						
						{this.props.past_research}
						
					</div>
				</div>
			</div>
		);
	}
}

export default PastResearchTab;