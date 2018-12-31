import React from 'react'
import DotLoader from '../utilities/animations/DotLoader'
import LabSearchItem from './LabSearchItem'
import {SubmitInput} from '../../3-utils/Inputs'

export default function (props) {
  if (props.loading) {
    return <DotLoader />
  }
  return (
    <div>
      {props.labData.map(lab => (
        <LabSearchItem
          key={lab.id}
          id={lab.id}
          saved_labs={props.savedProjects}
          name={lab.name}
          positions_applied={props.usersAppliedProjects}
          positions={lab.projects}
        />
      ))}
      <SubmitInput onClick={props.loadMoreLabs}>Mo' Labs Mo' Problems</SubmitInput>
    </div>
  )
}
