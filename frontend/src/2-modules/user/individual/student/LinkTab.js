import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'

export default function LinkTab ({linkedin_link, owner}) {
  return (
    <div id='user-links'>
      <h1>Links</h1>
      <div>
        <a
          target='_blank'
          href={linkedin_link}
          style={{ textAlign: 'left', textDecoration: 'underline' }}
        >
          LinkedIn
        </a>
      </div>
      <Editor
        permissions={owner}
        superClick={() => openModal('link-edit')}
      />
    </div>
  )
}