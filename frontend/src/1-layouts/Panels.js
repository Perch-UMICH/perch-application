import React from 'react'
import './Panels.scss'

export function Canvas(props) {
  return <div id='canvas'>{props.children}</div>
}

export function LeftPanel(props) {
  return (
    <div className='panel left-panel'>{props.children}</div>
  )
}

export function MainPanel(props) {
  return (
    <div className='panel main-panel'>{props.children}</div>
  )
}

export function RightPanel(props) {
  return (
    <div className='panel right-panel'>{props.children}</div>
  )
}

export function HeaderPanel(props) {
  return (
    <div className='panel header-panel'>{props.children}</div>
  )
}