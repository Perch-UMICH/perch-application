import React, {Component} from 'react';
import LabSearchProject from './LabSearchProject'
import {getCurrentUserId, getStudentFromUser, getFacultyFromUser, isStudent, isFaculty} from '../../helper.js'
import './LabDashboard.css';

class LabDashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			position_list: [],
			applied_list: [],
		}
	}

	componentDidMount() {
		// if student, show saved projects & applications
		if (isStudent()) {
			getStudentFromUser(getCurrentUserId()).then((resp) => {
				console.log(resp.data.position_list)
				this.setState({
					position_list: resp.data.position_list,
					applied_list: resp.data.position_list, // TODO: SET TO APPLIED LIST ONCE APPLICABLE
				})
			})
		}
		// if faculty, show existing projects (allow to edit?) and applicants.
		else if (isFaculty()) {
			getFacultyFromUser(getCurrentUserId()).then((resp) => {
				// TODO: set existing projects & applicants.
			})
		}
	}

	render() {
		var facultyOwned = isFaculty();
		const boxOneTitle = isStudent() ? "Saved Projects" : "Your Projects";
		const boxTwoTitle = isStudent() ? "Projects You've Applied To" : "Applicants To Your Projects";

		return (
			<div className='shift-down' style={{minHeight: '70vh'}}>
				<div className='lab-dashboard'>
						<h1>{boxOneTitle}</h1>
	         	<div className='lab-dashboard-container'>
	         		{
	         			this.state.position_list.map((position, index) => {
	         				return(
		           			<div key={`position-${index}`}>
		           				<a className='lab-dashboard-lab-name'>{position.lab.name}</a>
		           				<LabSearchProject key={position.id} id={position.id} title={position.title} facultyOwned={facultyOwned} spots='MISSING' saved='true' description={position.description} urop={position.is_urop_project}/>
		           			</div>
	           			)
	         		})}
	      	</div>
	     </div>
			 <div className='lab-dashboard'>
			 		<h1>{boxTwoTitle}</h1>
					 <div className='lab-dashboard-container'>
						 {
							 this.state.applied_list.map((obj, index) => {
								 return(
									 <div key={`applied-${index}`}>
										 <a className='lab-dashboard-lab-name'>{obj.lab.name}</a>
										 <LabSearchProject key={obj.id} id={obj.id} title={obj.title} spots='MISSING' saved='true' applied={true} description={obj.description} urop={obj.is_urop_project}/>
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
