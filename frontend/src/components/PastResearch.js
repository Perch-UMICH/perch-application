import React, {Component} from 'react';
import SquareButton from './SquareButton'
import './PastResearch.css';

class PastResearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>List Any Past Research</div>
					<form className='container'>
						<textarea className='past-research-input' placeholder="Rodriguez's Neurosurgery Lab"></textarea>
						<SquareButton destination='notable-classes' label='next'/>
					</form>
				</div>
			</div>
		);
	}
}

export default PastResearch;