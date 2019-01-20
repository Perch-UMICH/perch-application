import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import Apply from './Apply'
import SaveRemove from './SaveRemove'
import Submitted from './Submitted'
import Description from './Description'
import Title from './Title'
import {
  // addToStudentPositionList,
  // removeFromStudentPositionList
} from '../../../../backend/index'

function addToStudentPositionList() {
  alert('todo')
}

function removeFromStudentPositionList() {
  alert('todo')
}

class Project extends Component {
  // holds saved, applied, and application responses, and whether its been modified
  constructor (props) {
    super(props)
    this.state = {
      saved: false,
      applied: false,
      applicateResponses: [],
      modified: false,
      showModal: false,
    }
    this.submitApplication = this.submitApplication.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.updateApplication = this.updateApplication.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  // saves a project for the user
  handleSave (command, projectId) {
    if (command === 'save') addToStudentPositionList([projectId])
    else removeFromStudentPositionList([projectId])
    this.setState({
      saved: !this.state.saved,
      modified: true
    })
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
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

  // initializes saved and applied state of project
  // static getDerivedStateFromProps (nextProps, prevState) {
  //   // if (!prevState.modified) {
  //   //   let { userSavedProjects, userAppliedProjects } = nextProps
  //   //   let thisProjectId = nextProps.project.id
  //   //   let saved, applied
  //   //   userSavedProjects.forEach(aProjectId => {
  //   //     if (aProjectId === thisProjectId) saved = true
  //   //   })
  //   //   userAppliedProjects.forEach(aProjectId => {
  //   //     if (aProjectId === thisProjectId) applied = true
  //   //   })
  //   //   return { saved, applied }
  //   // }
  // }

  // updates the application responses for a project
  updateApplication (applicateResponses) {
    this.setState({ applicateResponses })
  }

  // saved getter
  get saved () {
    return this.state.saved
  }

  // applied getter
  get applied () {
    return this.state.applied
  }

  render () {
    let { project, deleteOnRemove } = this.props
    let { lab_id, title, description, id } = project
    let {
      applied,
      handleSave,
      saved,
      submitApplication,
      updateApplication
    } = this

    // used for dashboard
    if (!this.saved && deleteOnRemove) return null

    // normal render
    return (
      <div key={id} className='project lab-srch-item-container'>
        <Title labId={lab_id} title={title} />
        <Description>{description}</Description>
        {!applied && <Apply id={id} openModal={this.toggleModal}/>}
        {!applied && <SaveRemove saved={saved} id={id} onClick={handleSave} />}
        {applied && <Submitted />}
        {/* <Modal
          project={project}
          submitApplication={submitApplication}
          updateApplication={updateApplication}
          showModal={this.state.showModal}
          closeModal={this.toggleModal}
        /> */}
      </div>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  deleteOnRemove: PropTypes.bool,
}
export default Project
