import React from 'react'
import './Floater.scss'

/* 
  Floats a single panel right in the middle of the nearest relative parent 
*/
export default function(props) {
  return <div id='floater'>{props.children}</div>
}