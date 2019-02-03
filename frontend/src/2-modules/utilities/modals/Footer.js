import React from 'react'
import BasicButton from '../buttons/BasicButton'
import { SubmitButton, DeleteButton } from './Buttons'
import styles from './Modal.module.scss'
import { SubmitInput } from '../../../3-utils/Inputs'

export default function ({
  deleteFunc,
  noAction,
  handleClose,
  onSubmit,
  submitText
}) {
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
      <SubmitInput style={{ width: '200px', display: 'inline-block', marginLeft: '1em' }} onClick={handleClose.bind(this)}>
        close
      </SubmitInput>
      {submitText && (
        <SubmitInput
          style={{ width: '200px', display: 'inline-block', marginLeft: '1em' }}
          onClick={() => {
            handleClose()
            onSubmit()
          }}
        >
          submit
        </SubmitInput>
      )}
      {/* {submitText && (
        <SubmitButton {...closeFunctions}>{submitText}</SubmitButton>
      )} */}
    </div>
  )
}
