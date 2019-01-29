import React, { Component } from 'react'
import { MassiveButton } from '../../3-utils/Buttons'
import { updateUserProfile } from '../../backend';

export default class StudentOrProfessor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      role: null
    }
  }

  componentDidMount () {
    this.props.onRef(this)
  }

  handleStudent () {
    this.setState({ role: 'student' }, this.props.handleStudent)
  }

  handleFaculty () {
    this.setState({ role: 'faculty' }, this.props.handleFaculty)
  }

  save () {
    let { role } = this.state
    updateUserProfile({ role })
  }

  render () {
    return (
      <div>
        <MassiveButton onClick={this.handleStudent.bind(this)}>
          Student
        </MassiveButton>
        <MassiveButton onClick={this.handleFaculty.bind(this)}>
          Faculty
        </MassiveButton>
      </div>
    )
  }
}
