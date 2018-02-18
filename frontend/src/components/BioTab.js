import React, {Component} from 'react';
import './BioTab.css';

class BioTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='tab-header'>{this.props.header.toUpperCase()}</div>
				<div className='bio-tab'>
					{this.props.msg}
				</div>
			</div>
		);
	}
}

export default BioTab;