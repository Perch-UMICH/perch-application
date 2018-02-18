import React, {Component} from 'react';
import SquareButton from './SquareButton'
import './NotableClasses.css';

class NotableClasses extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='past-research shift-down'>
				<div className='container center-align past-research-form shadow'>
					<div className='past-research-header'>List Notable Classes</div>
					<form className='container'>
						<textarea className='past-research-input' placeholder="EECS 281"></textarea>
						<SquareButton destination='student-profile' label='next'/>
					</form>
				</div>
			</div>
		);
	}
}

export default NotableClasses;