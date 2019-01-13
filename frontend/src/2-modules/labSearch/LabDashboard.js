/* Lab Dashboard ('YOUR PROJECTS') page for both students and faculty
Students:
  -  Display saved projects
	-  Display projects that they've applied to

Faculty: (an idea)
  -  Display the projects that they own / have created
	-  Display applicants to their projects (THIS COULD DEFINITELY GO IN ANOTHER AREA)
*/

import React, { Component } from 'react'
import Project from './labProjects/project/Project'
import {
  getCurrentUserId,
  getStudentFromUser,
  getFacultyFromUser,
  isStudent,
  isFaculty,
  getAllStudentApplicationResponses
} from '../../backend/index'
import './LabDashboard.scss'

class LabDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      savedProjects: [],
      applied_list: [],
      positions_applied: []
    }
  }

  componentDidMount () {
    // if student, show saved projects & applications
    getStudentFromUser(getCurrentUserId()).then(({ data }) => {
      this.setState({
        savedProjects: data.position_list,
        applied_list: data.position_list // TODO: SET TO APPLIED LIST ONCE APPLICABLE
      })
    })

    getAllStudentApplicationResponses(getCurrentUserId()).then(({ data }) => {
      let positions_applied = data.map(app => app.position_id)
      this.setState({ positions_applied }, r=>console.log('state',this.state))
    })
  }

  updateProjects (id) {
    let new_state = this.state
    let position_list = new_state.position_list
    position_list = position_list.filter(value => value.id !== id)
    new_state.position_list = position_list
    this.setState(new_state)
  }

  render () {
    return (
      <div className='shift-down'>
        <div className='dashboard'>
          <div className='projectContainer'>
            {this.state.savedProjects.map(project => (
              <Project
                project={project}
                userSavedProjects={this.state.savedProjects.map(r => r.id)}
                userAppliedProjects={this.state.positions_applied}
                updateProjects={this.updateProjects.bind(this)}
                deleteOnRemove
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default LabDashboard
