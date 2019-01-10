import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'
import styles from './Bio.module.scss'

export default function ({ bio, owner }) {
  let emptyMessage = 'Superstar, worldwide phenomenon'
  return (
    <div className={styles.bio}>
      <div className={styles.content}>{!bio.length ? emptyMessage : bio}</div>
      <Editor permissions={owner} superClick={() => openModal('bio-edit')} />
    </div>
  )
}
