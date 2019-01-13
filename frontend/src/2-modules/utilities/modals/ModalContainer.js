import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Floater from '../../../1-layouts/Floater'
import Header from './Header'
import styles from './Modal.module.scss'
import Footer from './Footer'

class ModalContainer extends Component {
  // conditionally shows modal depending on state of parent component
  get getClasses () {
    if (this.props.showModal) return `${styles.modal}`
    else return `${styles.modal} ${styles.closed}`
  }

  // centers header, content, and footer
  render () {
    let { title, children, closeModal } = this.props
    return (
      <div className={this.getClasses}>
        <Floater>
          <div className={styles.content}>
            <Header>{title}</Header>
            <div>{children}</div>
            <Footer {...this.props} handleClose={closeModal} />
          </div>
        </Floater>
      </div>
    )
  }
}

ModalContainer.propTypes = {
  // text for the submit button
  submitText: PropTypes.string,
  // what to do when submitted
  onSubmit: PropTypes.func,
  // what goes inside the modal container
  children: PropTypes.object.isRequired,
  // title of the modal
  title: PropTypes.string.isRequired,
  // boolean for whether to show the modal
  showModal: PropTypes.bool.isRequired,
  // func that should flip the showModal bool
  closeModal: PropTypes.func.isRequired,
}

export default ModalContainer
