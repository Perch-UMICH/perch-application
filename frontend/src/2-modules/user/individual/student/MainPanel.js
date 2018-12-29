import React from 'react'
import UserWorkExperience from './UserWorkExperience'
import QuickView from './QuickView'

export default function MainPanel (props) {
  return (
    <div id='user-profile-column-C'>
      <QuickView {...props}/>
      <UserWorkExperience {...props}/>
    </div>
  )
}