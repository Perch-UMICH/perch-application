import React, { Component } from 'react'
import { openModal } from '../../../../helper'
import Editor from '../../../utilities/Editor'
import styles from './Header.module.scss'
import ModalContainer from '../../../utilities/modals/ModalContainer'
import { EditQuickview } from '../StudentEditors'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal () {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    let { name, owner, img } = this.props
    return (
      <div className={styles.header}>
        <div className={styles.name}>{name}</div>
        <div>
          <b>Student</b> at the <b>University of Michigan</b>
        </div>
        <Editor permissions={owner} superClick={this.toggleModal} />
        <ModalContainer
          title='Edit Quickview Info'
          closeModal={this.toggleModal}
          showModal={this.state.showModal}
          onSubmit={this.props.sendHeaderInfo}
          submitText={'Save'}
        >
          <EditQuickview
            img={img}
            user={{}}
            updateUser={this.props.updateUser}
          />
        </ModalContainer>
      </div>
    )
  }
}
