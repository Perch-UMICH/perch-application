import React from 'react'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'

export default function ProfilePhoto ({img}) {
  return (
    <div id='user-quickview-img-container'>
      <img id='user-quickview-img' src={img || '/img/rodriguez.jpg'} />
    </div>
  )
}