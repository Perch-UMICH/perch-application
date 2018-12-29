import React from 'react'
import ContactTab from './ContactTab'
import LinkTab from './LinkTab'

export default function LeftPanel (props) {
  return (
    <div id='user-column-L'>
      <ContactTab {...props} />
      <LinkTab {...props} />
    </div>
  )
}