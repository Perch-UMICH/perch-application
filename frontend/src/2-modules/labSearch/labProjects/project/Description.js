import React from 'react'

export default function Description ({ children }) {
  let characterLimit = window.innerWidth > 800 ? 400 : 100
  let overflow = false
  if (children.length > characterLimit) {
    children = children.slice(0, characterLimit)
    overflow = true
  }
  return (
    <div className='project_description'>
      {children}
      {overflow && <span className='ellipsis'>...</span>}
    </div>
  )
}