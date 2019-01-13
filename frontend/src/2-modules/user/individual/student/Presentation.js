import React from 'react'
import { isLoggedIn } from '../../../../helper'
import ErrorPage from '../../../utilities/ErrorPage'
import ContactTab from './ContactTab.js'
import LinkTab from './LinkTab.js'
import SkillsInterests from './SkillsInterests'
import Bio from './Bio'
import Header from './Header'
import ProfilePhoto from './ProfilePhoto.js'
import { LeftPanel, MainPanel, Canvas } from '../../../../1-layouts/Panels'
import {
  VerticalSplit,
  SplitLeft,
  SplitRight
} from '../../../../1-layouts/VerticalSplit'
import WorkExperiences from './WorkExperiences'
import './StudentProfile.css'

function StudentProfile (props) {
  if (!isLoggedIn()) return <ErrorPage />
  else {
    return (
      <Canvas panels={2}>
        <LeftPanel>
          <ProfilePhoto {...props} />
          <SkillsInterests {...props} />
          <ContactTab {...props} />
          {/* <LinkTab {...props} /> */}
        </LeftPanel>
        <MainPanel>
          <Header {...props} />
          <Bio {...props} />

          <VerticalSplit>
            <SplitLeft>
              <WorkExperiences {...props} />
            </SplitLeft>
            <SplitRight>
              <WorkExperiences {...props} />
            </SplitRight>
          </VerticalSplit>

          <WorkExperiences {...props} />

          <VerticalSplit>
            <SplitLeft>
              <WorkExperiences {...props} />
            </SplitLeft>
            <SplitRight>
              <WorkExperiences {...props} />
            </SplitRight>
          </VerticalSplit>
        </MainPanel>
      </Canvas>
    )
  }
}

export default StudentProfile
