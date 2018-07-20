import React, {Component} from 'react';
import LabSearchProject from './LabSearchProject'
import './LabDashboard.css';

class LabDashboard extends Component {

	render() {
		return (
			<div className='shift-down'>
				<div id='saved-labs-header'>Saved Labs</div>
				<div className='lab-dashboard'>
		           	<div id='lab-srch-results'>
		           		<a className='lab-dashboard-lab-name'>Dr. Meha's Lab</a>
		           		<LabSearchProject title='Oncology Study' spots='1' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job.' urop/>
		           		<a className='lab-dashboard-lab-name'>Dr. Patel's Lab</a>
		           		<LabSearchProject title='Pharmaceutical Assistant' spots='2' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job.'/>
		           		<a className='lab-dashboard-lab-name'>Dr. Jone's Lab</a>
		           		<LabSearchProject title='Lab Analyst' spots='1' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job.'/>
		           		<a className='lab-dashboard-lab-name'>Dr. Manischevitz's Lab</a>
		           		<LabSearchProject title='Rat Overlord' spots='2' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job.'/>
		        	</div>
		       </div>
	       </div>
		);
	}
}

export default LabDashboard;