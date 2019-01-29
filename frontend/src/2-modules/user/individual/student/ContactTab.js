import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../backend/index'
import styles from './Contact.module.scss'

export default function ({contactEmail, contactPhone, owner}) {
  return (
    <div className={styles.contact}>
      <div>
        <div id='user-email'>
          <b>Email </b>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <div id='user-phone'>
          <b>Phone</b> {contactPhone}
        </div>
      </div>
      <Editor
        permissions={owner}
        superClick={() => alert('todo')}
      />
    </div>
  )
}