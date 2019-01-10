import React from 'react'
import { openModal } from '../../../../helper'
import Editor from '../../../utilities/Editor'

export default function Header({name, owner}) {
  return (
    <div id='user-quickview-header'>
      <div id='user-quickview-name'>{name}</div>
      <Editor
        permissions={owner}
        superClick={() => openModal('quickview-edit')} />
    </div>
  )
}