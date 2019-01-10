import React, { Component } from 'react'
import Modal from './Modal'
import Apply from './Apply'
import SaveRemove from './SaveRemove'
import Submitted from './Submitted'
import Description from './Description'
import Title from './Title'
import {
  addToStudentPositionList,
  removeFromStudentPositionList
} from '../../../../helper'

class Project extends Component {
  constructor (props) {
    super(props)
    this.state = {
      saved: false,
      applied: false,
      applicateResponses: []
    }
    this.submitApplication = this.submitApplication.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.updateApplication = this.updateApplication.bind(this)
  }

  // saves a project for the user
  handleSave (command, projectId) {
    if (command === 'save') addToStudentPositionList([projectId])
    else removeFromStudentPositionList([projectId])
    this.setState({ saved: !this.state.saved })
  }

  // submits application for a project
  submitApplication () {
    alert('hi')
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

  static getDerivedStateFromProps (nextProps, prevState) {
    let { userSavedProjects, userAppliedProjects } = nextProps
    let thisProjectId = nextProps.project.id
    let saved = false
    let applied = false
    userSavedProjects.forEach(aProjectId => {
      if (aProjectId === thisProjectId) saved = true
    })
    userAppliedProjects.forEach(aProjectId => {
      if (aProjectId === thisProjectId) applied = true
    })
    return { saved, applied }
  }

  updateApplication (applicateResponses) {
    this.setState({ applicateResponses })
  }

  get saved () {
    return this.state.saved
  }

  get applied () {
    return this.state.applied
  }

  render () {
    let { project } = this.props
    let { lab_id, title, description, id } = project
    let {
      applied,
      handleSave,
      saved,
      submitApplication,
      updateApplication
    } = this
    return (
      <div key={id} className='project'>
        <Title labId={lab_id} title={title} />
        <Description>{description}</Description>
        {!applied && <Apply id={id} />}
        {!applied && <SaveRemove saved={saved} id={id} onClick={handleSave} />}
        {applied && <Submitted />}
        <Modal
          project={project}
          submitApplication={submitApplication}
          updateApplication={updateApplication}
        />
      </div>
    )
  }
}

export default Project
