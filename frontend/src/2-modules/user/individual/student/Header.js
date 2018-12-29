import React from 'react'
import { openModal } from '../../../../helper'
import Editor from '../../../utilities/Editor'

export default function Header({name, img, owner}) {
  return (
    <div>
      <div id='user-quickview-img-container'>
        <img id='user-quickview-img' src={img || '/img/rodriguez.jpg'} />
      </div>
      <div style={{ position: 'relative' }}>
        <div id='user-quickview-name'>{name}</div>
      </div>
      <Editor
        permissions={owner}
        superClick={() => openModal('quickview-edit')}
      />
    </div>
  )
}