import React from 'react'
import ApplyModal from '../../../user/Apply'
import EditModal from '../../../utilities/modals/EditModal'
export default function Modal ({ project, submitApplication, updateApplication }) {
  let { id, title, lab_id } = project
  return (
    <EditModal
      id={`${id}-apply`}
      wide
      actionName='submit'
      title={`Apply To ${title}`}
      modalAction={submitApplication}
    >
      <ApplyModal
        updateQuestions={updateApplication}
        position={project}
        pos_id={id}
        lab_id={lab_id}
      />
    </EditModal>
  )
}