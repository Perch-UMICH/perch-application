import React from 'react'

export default function Bubble(props) {
  return (
    <span className='bubble-container'>
      <div className={props.type == 'skill' ? 'skill' : 'interest'}>
        {props.children}
      </div>
    </span>
  )
}