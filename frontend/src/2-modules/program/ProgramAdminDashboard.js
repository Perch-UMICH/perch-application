import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
// import Project from './Project'
// import {
//   getCurrentUserId,
//   getStudentFromUser,
//   getFacultyFromUser,
//   isStudent,
//   isFaculty,
//   getAllStudentApplicationResponses
// } from '../../helper.js'
import ProgramAdminNav from './ProgramAdminNav'
import Project from './Project'
import Student from './Student'
import Match from './Match'
import Settings from './Settings'
import Application from './Application'
import './ProgramAdminDashboard.scss'

class ProgramAdminDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    console.log("Program admin dashboard rendererd")
    return (
      <div>
        <ProgramAdminNav match={this.props.match}/>
        <div style={{minHeight: '100vh', paddingTop: '50px'}}>
          <Switch>
            <Route path={this.props.match.path + '/applications'} component={Application}/>
            <Route path={this.props.match.path + '/projects'} component={Project}/>
            <Route path={this.props.match.path + '/project-applicants'} component={Project}/>
            <Route path={this.props.match.path + '/project-accepted'} component={Project}/>
            <Route path={this.props.match.path + '/students'} component={Student}/>
            <Route path={this.props.match.path + '/student-applicants'} component={Student}/>
            <Route path={this.props.match.path + '/student-accepted'} component={Student}/>
            <Route path={this.props.match.path + '/match'} component={Match}/>
            <Route path={this.props.match.path + '/settings'} component={Settings}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default ProgramAdminDashboard