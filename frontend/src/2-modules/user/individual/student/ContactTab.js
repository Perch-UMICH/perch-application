import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'

export default function ContactTab ({contact_email, contact_phone, owner}) {
  return (
    <div className='user-contact'>
      <h3>Contact</h3>
      <div>
        <div id='user-email'>
          <b>Email </b>
          <a href={`mailto:${contact_email}`}>{contact_email}</a>
        </div>
        <div id='user-phone'>
          <b>Phone</b> {contact_phone}
        </div>
      </div>
      <Editor
        permissions={owner}
        superClick={() => openModal('contact-edit')}
      />
    </div>
  )
}