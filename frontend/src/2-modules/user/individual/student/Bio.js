import React, { Component } from 'react'
import Editor from '../../../utilities/Editor'
import { openModal, updateStudent } from '../../../../helper'
import styles from './Bio.module.scss'
import ModalContainer from '../../../utilities/modals/ModalContainer'
import { EditBio } from '../StudentEditors'

export default class Bio extends Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  handleSubmit() {
    updateStudent({ bio: this.props.bio })
  }

  render () {
    let { updateUser, owner, bio } = this.props
    let { showModal } = this.state
    return (
      <div className={styles.bio}>
        <div className={styles.content}>{bio}</div>
        <Editor permissions={owner} superClick={this.toggleModal} />
        <ModalContainer
          title='Edit Bio'
          submitText='Save'
          onSubmit={this.handleSubmit}
          showModal={showModal}
          closeModal={this.toggleModal}
        >
          <EditBio bio={bio} updateUser={updateUser} />
        </ModalContainer>
      </div>
    )
  }
}
