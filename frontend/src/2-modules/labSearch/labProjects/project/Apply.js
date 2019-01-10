import React from 'react'
import { openModal } from '../../../../helper.js'
import Floater from '../../../../1-layouts/Floater'


export default function Apply ({ id }) {
  return (
    <div className='toggler apply'>
      <Floater>
        <div onClick={() => openModal(`${id}-apply`)}>apply</div>
      </Floater>
    </div>
  )
}
