import React, {Component} from 'react';
import SquareButton from './SquareButton'
import './NotableClasses.css';

class NotableClasses extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='notable-classes shift-down'>
				<div className='container center-align notable-classes-form shadow'>
					<div className='notable-classes-header'>Academics</div>
					<form className='container'>
						<div className='row'>
							<div className='col s4'>
								<div className='notable-classes-label left-align'>GPA</div>
								<input classsName='' type='number' placeholder='4.0'/>
							</div>
							<div className='col s4'>
								<div className='notable-classes-label left-align'>Major</div>
								<input classsName='' type='text' placeholder='your major'/>
							</div>
							<div className='col s4'>
								<div className='notable-classes-label left-align'>Year</div>
								<input classsName='' type='text' placeholder='year'/>
							</div>
						</div>
						<div className='notable-classes-label left-align'>List your notable classes</div>
						<textarea className='notable-classes-input' placeholder="EECS 281"></textarea>
						<SquareButton destination='student-profile' label='next'/>
					</form>
				</div>
			</div>
		);
	}
}

export default NotableClasses;