import React, { Component } from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../backend/index'
import Bubble from './Bubble'
import ModalContainer from '../../../utilities/modals/ModalContainer'
import PickYourInterests from '../../individual/PickYourInterests'
import styles from './SkillsInterests.module.scss'

export default class SkillsInterests extends Component {
  constructor () {
    super()
    this.state = {
      showModal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal () {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    let { owner, tags, skills, updateUser } = this.props
    let defaultMessage = 'Big nickelback fan'
    let noSkillsOrTags = !tags.length && !skills.length
    console.log(this.props)
    return (
      <div id='user-skills-interests'>
        <h1>Skills & Interests</h1>
        {noSkillsOrTags && (
          <div className={styles.default}>{defaultMessage}</div>
        )}
        <Interests tags={tags} />
        <Skills tags={skills} />
        <Editor permissions={owner} superClick={this.toggleModal} />
        <ModalContainer
          title='pick your interests'
          showModal={this.state.showModal}
          closeModal={this.toggleModal}
        >
          <PickYourInterests
            modalEdit
            editorOnly
            user={this.props}
            updateUser={updateUser}
          />
        </ModalContainer>
      </div>
    )
  }
}

function Interests ({ tags }) {
  return tags.map((item, index) => (
    <Bubble key={`${index}-int`} type='interest'>
      {item.name}
    </Bubble>
  ))
}

function Skills ({ tags }) {
  return tags.map((item, index) => (
    <Bubble key={`${index}-skill`} type='skill'>
      {item.name}
    </Bubble>
  ))
}
