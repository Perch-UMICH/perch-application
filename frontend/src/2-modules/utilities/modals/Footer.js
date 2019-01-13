import React from 'react'
import BasicButton from '../buttons/BasicButton'
import { SubmitButton, DeleteButton } from './Buttons'
import styles from './Modal.module.scss'

export default function ({ deleteFunc, noAction, handleClose, onSubmit, submitText }) {
  let deleteFunctions = {
    handleDelete: deleteFunc,
    handleClose
  }
  let closeFunctions = {
    handleClose,
    handleSubmit: onSubmit
  }
  return (
    <div className={styles.footer}>
      {deleteFunc && <DeleteButton {...deleteFunctions} />}
      <BasicButton superClick={handleClose.bind(this)} msg='close' />
      {submitText && <SubmitButton {...closeFunctions}>{submitText}</SubmitButton>}
    </div>
  )
}