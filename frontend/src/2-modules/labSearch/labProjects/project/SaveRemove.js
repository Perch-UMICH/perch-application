import React from 'react'
import Floater from '../../../../1-layouts/Floater'

export default function SaveRemove ({ saved, onClick, id }) {
  let handleClick = saved ? () => onClick('remove') : () => onClick('save', id)
  return (
    <div>
      <div className='toggler saveRemove' onClick={handleClick}>
        <Floater>
          {saved ? 'remove' : 'save'}
        </Floater>
      </div>
    </div>
  )
}