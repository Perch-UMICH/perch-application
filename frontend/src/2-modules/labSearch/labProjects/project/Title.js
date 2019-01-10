import React from 'react'

export default function Title ({ title, labId }) {
  return (
    <div className='title_container'>
      <a className='truncate title' href={`prof-page/${labId}`} target='_blank'>
        {title}
      </a>
    </div>
  )
}