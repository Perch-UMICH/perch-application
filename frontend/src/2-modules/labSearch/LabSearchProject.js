import React, { Component } from 'react'
import Apply from '../user/Apply'
import EditModal from '../utilities/modals/EditModal'
import {
  addToStudentPositionList,
  removeFromStudentPositionList,
  createStudentApplicationResponse,
  getCurrentStudentId,
  submitStudentApplicationResponse
} from '../../helper.js'
import './LabSearchProject.scss'

class LabSearchProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      added: this.props.saved,
      position: this.props.position || {},
      question_resps: [],
      submitted: this.props.submitted
    }
  }

  componentDidMount () {
    this.formatTitle()
  }

  componentWillReceiveProps (props) {
    if (props.submitted) this.setState({ submitted: props.submitted })
  }

  openModal (id) {
    if (document.getElementById(id)) {
      document.getElementById(id).classList.add('activated')
      document.getElementById(`${id}-backdrop`).classList.add('activated')
    }
  }

  // updates application from question responses to be ready for submittal
  updateApplication = question_resps => {
    this.setState({ question_resps })
  }

  submitApplication () {
    let question_resps = this.state.question_resps, resps = []

    if (question_resps) {
      resps = question_resps.map(q => {
        return { question: q.question, answer: q.answer }
      })
    }

    let application = {
      position_id: this.props.position_id,
      responses: resps
    }

    createStudentApplicationResponse(
      getCurrentStudentId(),
      this.state.position.id,
      application
    ).then(resp => {
      if (resp.data && resp.data.id) {
        submitStudentApplicationResponse(
          getCurrentStudentId(),
          this.state.position.id
        )
          .then(r => {
            this.setState({ submitted: true })
            if (this.props.loadSubmitted) this.props.loadSubmitted()
          })
          .catch(e => alert('Error in create application response'))
      }
    })
  }

  saveProject = () => {
    let { id } = this.props.position
    addToStudentPositionList([id])
    this.toggleAdder()
  }

  removeProject = () => {
    let { id } = this.props.position
    removeFromStudentPositionList([id])
    this.toggleAdder()
    this.props.updateProjects(id)
  }

  toggleAdder = () => {
    let { added } = this.state
    this.setState({ added: !added })
  }

  formatTitle = () => {
    let newPos = this.state.position
    if (newPos.description && newPos.description.length > 270) {
      this.setState({ overflowDescription: true })
      newPos.description = newPos.description.slice(0, 270)
    }
    this.setState({ position: newPos })
  }

  renderModals () {
    let position = this.state.position
    return (
      <EditModal
        id={`${position.id}-apply`}
        wide
        actionName='submit'
        title={`Apply To ${position.title}`}
        modalAction={this.submitApplication.bind(this)}
      >
        <Apply
          updateQuestions={this.updateApplication}
          position={position}
          pos_id={position.id}
          lab_id={this.props.id}
        />
      </EditModal>
    )
  }

  render () {
    let { spots, lab_id, title, description, id } = this.state.position
    let { urop, applied, position_id } = this.props
    let { overflowDescription, added, submitted } = this.state

    var applyButton = (
      <div className="project_apply project_action_label">
        <a onClick={() => this.openModal(`${id}-apply`)}>Apply</a>
      </div>
    )

    var saveRemoveButton = (
      <div>
        {!added &&
          <div
            className="project_adder project_action_label"
            onClick={this.saveProject}
          >
            save
          </div>}
        {added &&
          <div
            className="project_adder project_action_label"
            onClick={this.removeProject}
          >
            remove
          </div>}
      </div>
    )

    // if the user is viewing this project on their lab dashboard page in the 'applied' section, don't show the 'apply' and 'save' buttons
    if (applied || submitted) {
      applyButton = (
        <div className='group-project-application-submitted'>
          Application<br />Submitted
        </div>
      )
      saveRemoveButton = null
    }

    return (
      <div key={position_id} className="project">

        {this.renderModals()}

        <div className="title_container">
          <a
            className="truncate title"
            href={`prof-page/${lab_id}`}
            target='_blank'
          >
            {title}
          </a>
          {urop && <span className="project_tag">UROP</span>}
        </div>

        <div className="project_description">
          {description}
          <span className={overflowDescription ? 'ellipsis' : 'hide'}>...</span>
        </div>

        <div className="project_openings">
          <b>{spots}</b> {spots - 1 ? 'spots' : 'spot'}
        </div>

        {applyButton}
        {saveRemoveButton}

      </div>
    )
  }
}

export default LabSearchProject
