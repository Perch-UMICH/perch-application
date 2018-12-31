import React from 'react'
import './VerticalSplit.scss'

/* 
  Floats a single panel right in the middle of the page 
*/
export function VerticalSplit(props) {
  return <div id='vertical-split'>{props.children}</div>
}

export function SplitLeft(props) {
  return <div id='split-left'>{props.children}</div>
}

export function SplitRight(props) {
  return <div id='split-right'>{props.children}</div>
}