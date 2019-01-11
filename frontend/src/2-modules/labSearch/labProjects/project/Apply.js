import React from 'react'
import Floater from '../../../../1-layouts/Floater'


export default function Apply ({ id, openModal }) {
  return (
    <div className='toggler apply'>
      <Floater>
        <div onClick={() => openModal(`${id}-apply`)}>apply</div>
      </Floater>
    </div>
  )
}
