import React from 'react'
import styles from './SearchPage.module.scss'

/*
  Used for Search Page layout
*/

// parent wrapper around panels
export function Canvas(props) {
  return <div id={styles.canvas}>{props.children}</div>
}

export function LeftPanel(props) {
  return (
    <div id={styles.leftPanel}>{props.children}</div>
  )
}

export function MainPanel(props) {
  return (
    <div id={styles.mainPanel}>{props.children}</div>
  )
}
export function SearchPanel(props) {
  return (
    <div id={styles.searchPanel}>{props.children}</div>
  )
}

export function ResultsPanel(props) {
  return (
    <div id={styles.resultsPanel}>{props.children}</div>
  )
}