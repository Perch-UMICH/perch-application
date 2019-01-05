import React, { Component } from 'react'
import ApplyModal from '../../user/Apply'
import EditModal from '../../utilities/modals/EditModal'
import {
  addToStudentPositionList,
  removeFromStudentPositionList,
  createStudentApplicationResponse,
  getCurrentStudentId,
  submitStudentApplicationResponse,
  openModal
} from '../../../helper.js'
import './LabSearchProject.scss'

class Project extends Component {
  renderModals () {
    let position = this.props.project
    return (
      <EditModal
        id={`${position.id}-apply`}
        wide
        actionName='submit'
        title={`Apply To ${position.title}`}
        modalAction={this.props.submitApplication}
      >
        <ApplyModal
          updateQuestions={this.updateApplication}
          position={position}
          pos_id={position.id}
          lab_id={this.props.id}
        />
      </EditModal>
    )
  }

  get hasApplied () {
    return this.props.applied || this.props.submitted
  }

  render () {
    let { saved } = this.props
    let { spots, lab_id, title, description, id } = this.props.project
    let { handleSave } = this.props

    // if the user is viewing this project on their lab dashboard page in the 'applied' section, don't show the 'apply' and 'save' buttons

    let { hasApplied } = this

    return (
      <div key={id} className='project'>
        {this.renderModals()}
        <Title labId={lab_id} title={title} />
        <Description>{description}</Description>
        <Openings spots={spots} />
        {hasApplied ? <Submitted /> : <Apply id={id} />}
        {hasApplied ? null : (
          <SaveRemove added={saved} id={id} onClick={handleSave} />
        )}
      </div>
    )
  }
}

function Openings ({ spots }) {
  return (
    <div className='project_openings'>
      <b>{spots}</b> {spots - 1 ? 'spots' : 'spot'}
    </div>
  )
}

function Title ({ title, labId }) {
  return (
    <div className='title_container'>
      <a className='truncate title' href={`prof-page/${labId}`} target='_blank'>
        {title}
      </a>
    </div>
  )
}

function Description ({ children }) {
  const characterLimit = 500
  let overflow = false
  if (children.length > characterLimit) {
    children = children.slice(0, characterLimit)
    overflow = true
  }
  return (
    <div className='project_description'>
      {children}
      {overflow && <span className='ellipsis'>...</span>}
    </div>
  )
}

function Submitted (props) {
  return <div className='group-project-application-submitted'>Applied</div>
}

function Apply ({ id }) {
  return (
    <div className='project_apply project_action_label'>
      <a onClick={() => openModal(`${id}-apply`)}>Apply</a>
    </div>
  )
}

function SaveRemove ({ added, onClick, id }) {
  let handleClick = added
    ? () => onClick('save', id)
    : () => onClick('remove')
  return (
    <div>
      <div className='project_adder project_action_label' onClick={handleClick}>
        {added ? 'remove' : 'save'}
      </div>
    </div>
  )
}

export default Project
