import React from 'react'
import BasicButton from '../buttons/BasicButton'


export function SubmitButton ({ children, handleSubmit, handleClose }) {
  return (
    <BasicButton
      superClick={() => {
        if (handleSubmit) handleSubmit()
        handleClose()
      }}
      msg={children || 'save'}
    />
  )
}

export function DeleteButton ({ deleteFunc, handleClose }) {
  return (
    <BasicButton
      superClick={() => {
        deleteFunc()
        handleClose()
      }}
      delete
      msg='delete'
    />
  )
}