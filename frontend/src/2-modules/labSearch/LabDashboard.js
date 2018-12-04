/* Lab Dashboard ('YOUR PROJECTS') page for both students and faculty
Students:
  -  Display saved projects
	-  Display projects that they've applied to

Faculty: (an idea)
  -  Display the projects that they own / have created
	-  Display applicants to their projects (THIS COULD DEFINITELY GO IN ANOTHER AREA)
*/

import React, { Component } from 'react'
import LabSearchProject from './LabSearchProject'
import {
  getCurrentUserId,
  getStudentFromUser,
  getFacultyFromUser,
  isStudent,
  isFaculty,
  getAllStudentApplicationResponses
} from '../../helper.js'
import './LabDashboard.scss'

class LabDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position_list: [],
      applied_list: []
    }
  }

  componentDidMount () {
    // if student, show saved projects & applications
    if (isStudent()) {
      getStudentFromUser(getCurrentUserId()).then(({ data }) => {
        this.setState({
          position_list: data.position_list,
          applied_list: data.position_list // TODO: SET TO APPLIED LIST ONCE APPLICABLE
        })
      })
      getAllStudentApplicationResponses(getCurrentUserId()).then(({ data }) => {
        let positions_applied = data.map(app => app.position_id)
        this.setState({ positions_applied })
      })
    } else if (isFaculty()) {
      // if faculty, show existing projects (allow to edit?) and applicants.
      getFacultyFromUser(getCurrentUserId()).then(resp => {
        // TODO: set existing projects & applicants.
      })
    }
  }

  updateProjects (id) {
    let new_state = this.state
    let position_list = new_state.position_list
    position_list = position_list.filter(value => value.id !== id)
    new_state.position_list = position_list
    this.setState(new_state)
  }

  getPositionsJSX () {
    let positions_applied = this.state.positions_applied
    var facultyOwned = isFaculty()
    let position_list = this.state.position_list
    let position_jsx = position_list.map(position => {
      let submitted = false
      let pos_ids = positions_applied
      if (pos_ids && pos_ids.length) {
        pos_ids.map(pos => {
          if (pos == position.id) submitted = true
        })
      }
      return (
        <div key={`position-${position.id}`} className='item'>
          <LabSearchProject
            position={position}
            facultyOwned={facultyOwned}
            id={position.lab_id}
            submitted={submitted}
            saved={true}
            updateProjects={this.updateProjects.bind(this)}
          />
        </div>
      )
    })

    return position_jsx
  }

  render () {
    const boxOneTitle = isStudent() ? 'Saved Projects' : 'Your Projects'
    return (
      <div className='shift-down'>
        <div className='dashboard'>
          <h1 className='title'>{boxOneTitle}</h1>
          <div>
            {this.getPositionsJSX()}
          </div>
        </div>
      </div>
    )
  }
}

export default LabDashboard
