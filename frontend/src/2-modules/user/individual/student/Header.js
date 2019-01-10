import React from 'react'
import { openModal } from '../../../../helper'
import Editor from '../../../utilities/Editor'
import styles from './Header.module.scss'

export default function Header ({ name, owner }) {
  return (
    <div className={styles.header}>
      <div className={styles.name}>{name}</div>
      <div><b>Student</b> at the <b>University of Michigan</b></div>
      <Editor
        permissions={owner}
        superClick={() => openModal('quickview-edit')}
      />
    </div>
  )
}
