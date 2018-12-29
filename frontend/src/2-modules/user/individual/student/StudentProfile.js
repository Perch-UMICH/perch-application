import React from 'react'
import { isLoggedIn } from '../../../../helper'
import ErrorPage from '../../../utilities/ErrorPage'
import LeftPanel from './LeftPanel'
import MainPanel from './MainPanel'
import RightPanel from './RightPanel'
import './StudentProfile.css'

function StudentProfile (props) {
  if (!isLoggedIn()) return <ErrorPage />
  else {
    return (
      <div id='user-content-body'>
        {props.modals}
        <LeftPanel {...props} />
        <MainPanel {...props} />
        <RightPanel />
      </div>
    )
  }
}

export default StudentProfile
