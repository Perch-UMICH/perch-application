import React, { Component } from 'react'
import Project from './Presentation'
import './LabSearchItem.css'
import {
  addToStudentPositionList,
  removeFromStudentPositionList,
  createStudentApplicationResponse,
  getCurrentStudentId,
  submitStudentApplicationResponse,
  openModal
} from '../../../helper.js'

class LabProjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      applicationResponses: [],
    }
  }

  // saves a project for the user
  handleSave (command, projectId) {
    if (command === 'save') addToStudentPositionList([projectId])
    else removeFromStudentPositionList([projectId])
    this.setState({ saved: !this.state.saved })
  }

  // submits application for a project
  submitApplication () {
    // let { applicateResponses } = this.state

    // // turn into object form
    // applicateResponses = applicateResponses.map(({ question, answer }) => {
    //   return { question, answer }
    // })

    // let application = {
    //   position_id: this.props.position_id,
    //   responses: applicateResponses
    // }
    // createStudentApplicationResponse(
    //   getCurrentStudentId(),
    //   this.state.position.id,
    //   application
    // ).then(resp => {
    //   if (resp.data && resp.data.id) {
    //     submitStudentApplicationResponse(
    //       getCurrentStudentId(),
    //       this.state.position.id
    //     )
    //       .then(r => {
    //         this.setState({ submitted: true })
    //         if (this.props.loadSubmitted) this.props.loadSubmitted()
    //       })
    //       .catch(e => alert('Error in create application response'))
    //   }
    // })
  }

  // updates application from question responses to be ready for submittal
  updateApplication = applicateResponses => {
    this.setState({ applicateResponses })
  }

  render () {
    let functions = {
      handleSave: this.handleSave.bind(this),
      submitApplication: this.submitApplication.bind(this),
    }

    let { projects } = this.props
    return (
      <div className='lab-srch-item-container'>
        {projects.map(project => (
          <Project
            {...functions}
            {...this.state}
            {...this.props}

            key={project.id}
            id={project.lab_id}
            project={project}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    )
  }
}

export default LabProjects
