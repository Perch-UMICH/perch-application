import React from 'react'
import SkillsInterests from './SkillsInterests'
import UserBio from './UserBio'
import Header from './Header'

export default function QuickView(props) {
  return (
    <div id='user-quickview'>
      <Header {...props}/>
      <SkillsInterests {...props}/>
      <UserBio {...props}/>
    </div>
  )
}
