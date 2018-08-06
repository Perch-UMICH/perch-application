import React, {Component} from 'react';
import LabSearchProject from './LabSearchProject'
import {getCurrentUserId, getStudentFromUser} from '../../helper.js'
import './LabDashboard.css';

class LabDashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			position_list: [],
		}
	}

	componentDidMount() {
		getStudentFromUser(getCurrentUserId()).then((resp) => {
			console.log(resp.data.position_list)
			this.setState({position_list: resp.data.position_list})
		})
	}

	render() {
		return (
			<div className='shift-down' style={{minHeight: '70vh'}}>
				<div id='saved-labs-header'>Saved Labs</div>
				<div className='lab-dashboard'>
		           	<div id='lab-srch-results'>
		           		{
		           			this.state.position_list.map((position) => {
		           				return(
				           			<div>
				           				<a className='lab-dashboard-lab-name'>{position.lab.name}</a>
				           				<LabSearchProject key={position.id} id={position.id} title={position.title} spots='MISSING' saved='true' description={position.description} urop={position.is_urop_project}/>
				           			</div>
			           			)
		           		})}
		        	</div>
		       </div>
	       </div>
		);
	}
}

export default LabDashboard;