import React from 'react'
import { isLoggedIn } from '../../../../helper'
import ErrorPage from '../../../utilities/ErrorPage'
// import LeftPanel from './LeftPanel'
// import MainPanel from './MainPanel'
// import RightPanel from './RightPanel'

import {LeftPanel, MainPanel, RightPanel, Canvas} from '../../../../1-layouts/Panels' 
import './StudentProfile.css'

function StudentProfile (props) {
  if (!isLoggedIn()) return <ErrorPage />
  else {
    return (
      <Canvas>
        {/* {props.modals} */}

     

        {/* <LeftPanel {...props} />
        <MainPanel {...props} />
        <RightPanel /> */}
      </Canvas>
    )
  }
}

export default StudentProfile
