import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../backend/index'

export default function LinkTab ({linkedin_link, owner}) {
  return (
    <div id='user-links'>
      <h3>Links</h3>
      <div>
        <a
          target='_blank'
          href={linkedin_link}
          style={{ textAlign: 'left', textDecoration: 'underline' }}>
          LinkedIn
        </a>
      </div>
      <Editor
        permissions={owner}
        superClick={() => alert('todo')}
      />
    </div>
  )
}