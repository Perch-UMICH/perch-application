import React from 'react'
import DotLoader from '../utilities/animations/DotLoader'
import LabProjects from './labProjects/LabProjects'
import { SubmitInput } from '../../3-utils/Inputs'
import Project from './labProjects/project/Project'

export default function (props) {
  if (props.loading) {
    return <DotLoader />
  }
  return (
    <div>
      {props.labData.map(lab => (
        <Project project={lab} />
      ))}
      {props.nextLabIds.length > 0 && 
        <SubmitInput onClick={props.loadMoreLabs}>
          Mo' Labs Mo' Problems
        </SubmitInput>
      }
    </div>
  )
}


// <LabProjects
//           labId={lab.id}
//           projects={lab.projects}
//           labName={lab.name}
//           userSavedProjects={props.savedProjects}
//           userAppliedProjects={props.usersAppliedProjects}
//         />