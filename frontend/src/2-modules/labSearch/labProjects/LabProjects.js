import React, { Component } from 'react'
import Project from './project/Project'
import './LabSearchItem.css'
import './LabSearchProject.scss'

export default function (props) {
  let { projects, ...rest } = props
  return (
    <div className='lab-srch-item-container'>
      {projects.map(project => (
        <Project project={project} {...rest} />
      ))}
    </div>
  )
}
