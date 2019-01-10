import React from 'react'
import DotLoader from '../utilities/animations/DotLoader'
import LabProjects from './labProjects/LabProjects'
import { SubmitInput } from '../../3-utils/Inputs'

export default function (props) {
  if (props.loading) {
    return <DotLoader />
  }
  return (
    <div>
      {props.labData.map(lab => (
        <LabProjects
          labId={lab.id}
          projects={lab.projects}
          labName={lab.name}
          userSavedProjects={props.savedProjects}
          userAppliedProjects={props.usersAppliedProjects}
        />
      ))}
      {props.nextLabIds.length > 0 && 
        <SubmitInput onClick={props.loadMoreLabs}>
          Mo' Labs Mo' Problems
        </SubmitInput>
      }
    </div>
  )
}
