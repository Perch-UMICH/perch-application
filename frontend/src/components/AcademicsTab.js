import React, {Component} from 'react';
import './AcademicsTab.css';

class AcademicsTab extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='tab-header' style={{height: '30px'}}></div>
				<div className='academics-tab'>
					<div>
						<span className='academic-label'>GPA: </span>
						<span className='academic-info'>3.90</span>
					</div>
					<div>
						<span className='academic-label'>Year: </span>
						<span className='academic-info'>Junior</span>
					</div>
					<ul className='academic-label'>Notable Classes: 
						<li className='academic-info'>EECS 281</li>
						<li className='academic-info'>EECS 370</li>
						<li className='academic-info'>EECS 388</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default AcademicsTab;