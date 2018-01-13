import React, {Component} from 'react';
import './BioTab.css';

class BioTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='tab-header'>BIO</div>

				<div className='bio-tab'>
					I'm a junior at the University of Michigan studying Computer Science with interests in Computer Security, Software Development, and Machine Learning.
				</div>
			</div>
		);
	}
}

export default BioTab;