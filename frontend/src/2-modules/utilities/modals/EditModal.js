/* t
Modal for profile edit components; usage:

1) Pass relevant props:
	id, title, actionName (name for action button, default = "save"),
	modalAction (function to call on action button click).
	Pass child component as usual! (e.g. <EditModal ... ><Child/></EditModal>)

2) Add the following line of code to the parent component return:
	<div id="greyBackdrop" className="modal-backdrop"></div>

	Create & call handler in parent adding 'activated' classes to open, e.g. ...
	openEditModal() {
		document.getElementById( *id* ).classList.add('activated');
		document.getElementById("greyBackdrop").classList.add('activated');
	}
*/

import React, { Component } from 'react'
import BasicButton from '../buttons/BasicButton'
import Floater from '../../../1-layouts/Floater'
// import './EditModal.css'
import styles from './Modal.module.scss'

class EditModal extends Component {

  render () {
    var contentCSS = this.props.noPadding
      ? 'modal-content modal-no-padding'
      : 'modal-content'
    var bodyCSS = 'modal modal-fixed-footer display-modal'
    // if (this.props.wide) bodyCSS = 'modal modal-fixed-footer wide-modal'
    // if (this.props.medium) bodyCSS = 'modal modal-fixed-footer medium-modal'
    // if (this.props.slim) bodyCSS = 'modal modal-fixed-footer slim-modal'
    let css
    if (this.props.showModal) css = `${styles.modal}`
    else css = `${styles.modal} ${styles.closed}`

    return (
      <div className={css}>
        <Floater>
          <div id={this.props.id} className={styles.content}>
            <Header>{this.props.title}</Header>
            <Content className={contentCSS}>{this.props.children}</Content>
            <Footer {...this.props} handleClose={this.props.closeModal} />
          </div>
        </Floater>
      </div>
    )
  }
}

function Header ({ children }) {
  return <h1 className='modal-header'>{children}</h1>
}

function Content ({ className, children }) {
  return <div className={className}>{children}</div>
}

function Footer ({
  deleteFunc,
  noAction,
  handleClose,
  modalAction,
  actionName
}) {
  return (
    <div className={styles.footer}>
      {deleteFunc && (
        <BasicButton
          superClick={() => {
            this.props.deleteFunc()
            this.handleClose()
          }}
          delete
          msg='delete'
        />
      )}
      <BasicButton superClick={handleClose.bind(this)} msg='close' />
      {noAction ? null : (
        <BasicButton
          superClick={() => {
            if (modalAction) {
              modalAction()
            }
            handleClose()
          }}
          msg={actionName || 'save'}
        />
      )}
    </div>
  )
}

export default EditModal
