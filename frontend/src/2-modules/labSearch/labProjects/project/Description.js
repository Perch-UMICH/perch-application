import React from 'react'

export default function Description ({ children }) {
  const characterLimit = 500
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