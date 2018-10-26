/* Lab Dashboard ('YOUR PROJECTS') page for both students and faculty
Students:
  -  Display saved projects
	-  Display projects that they've applied to

Faculty: (an idea)
  -  Display the projects that they own / have created
	-  Display applicants to their projects (THIS COULD DEFINITELY GO IN ANOTHER AREA)
*/

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

	updateProjects(id) {
		let position_list = this.state.position_list
		position_list = position_list.filter((value)=> value.id !== id)
		this.state.position_list = position_list
		this.setState(this.state)
	}

	render() {
		var facultyOwned = isFaculty();
		const boxOneTitle = isStudent() ? "Saved Projects" : "Your Projects";
		const boxTwoTitle = isStudent() ? "Projects You've Applied To" : "Applicants To Your Projects";
		console.log('AHHH', this.state.position_list);
		return (
			<div className='shift-down' style={{minHeight: '70vh'}}>
				<div className='lab-dashboard'>
						<h1 className='lab-dashboard-title'>{boxOneTitle}</h1>
		         	<div className='lab-dashboard-container'>
		         		{	
		         			this.state.position_list.map((position, index) => {
		         				return(
			           			<div key={`position-${index}`} className='lab-dashboard-item'>
			           				{/*<a className='lab-dashboard-lab-name'>{position.lab.name}</a>*/}
			           				<LabSearchProject position={position} facultyOwned={facultyOwned} spots='MISSING' saved='true' updateProjects={this.updateProjects.bind(this)}/>
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
