import React from 'react'
import Apply from '../../../user/Apply'
import ModalContainer from '../../../utilities/modals/ModalContainer'

export default function Modal ({
  project,
  submitApplication,
  updateApplication,
  showModal,
  closeModal
}) {
  let { id, title, lab_id } = project
  return (
    <ModalContainer
      submitText='submit'
      title={`Apply To ${title}`}
      onSubmit={submitApplication}
      showModal={showModal}
      closeModal={closeModal}
    >
      <Apply
        updateQuestions={updateApplication}
        position={project}
        pos_id={id}
        lab_id={lab_id}
      />
    </ModalContainer>
  )
}
