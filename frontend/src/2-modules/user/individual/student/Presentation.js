import React from 'react'
import { isLoggedIn } from '../../../../helper'
import ErrorPage from '../../../utilities/ErrorPage'
import ContactTab from './ContactTab.js'
import LinkTab from './LinkTab.js'
import QuickView from './QuickView.js'
import Experiences from './Experiences.js'
import ProfilePhoto from './ProfilePhoto.js'
import {LeftPanel, MainPanel, Canvas} from '../../../../1-layouts/Panels' 
import './StudentProfile.css'

function StudentProfile (props) {
  if (!isLoggedIn()) return <ErrorPage />
  else {
    return (
      <Canvas panels={2}>
        <LeftPanel>
          {props.modals}
          <ProfilePhoto {...props} />
          <ContactTab {...props} />
          <LinkTab {...props} />
        </LeftPanel>
        <MainPanel>
          <QuickView {...props} />
        </MainPanel>
      </Canvas>
    )
  }
}

export default StudentProfile
