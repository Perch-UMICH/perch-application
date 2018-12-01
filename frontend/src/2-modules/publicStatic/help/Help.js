import React, { Component } from 'react'
import {
  wrapper,
  panel,
  activeVid,
  item,
  help,
  header
} from './Help.module.scss'

class Help extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'Making a Student Account',
      vid: 'test.mov'
    }
  }

  activate (title, vid) {
    this.setState({
      active: title,
      vid: vid
    })
  }

  render () {
    return (
      <div id={help}>
        <div id={header}>Learn to <b>Perch</b> yourself</div>
        <div id={wrapper}>
          <video src={`/vids/${this.state.vid}`} controls />
        </div>
        <div id={panel}>
          <h1>Tutorials</h1>
          <VidItem
            title='Making a Student Account'
            vid='test.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
          <VidItem
            title='Making a Professor Account'
            vid='test2.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
          <VidItem
            title='Editing Info'
            vid='test.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
          <VidItem
            title='Using the ProjectBook'
            vid='test.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
          <VidItem
            title='Applying to a project'
            vid='test.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
          <VidItem
            title='Best ways to communicate with faculty'
            vid='test.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
          <VidItem
            title='Join the Team'
            vid='test.mov'
            handleMovie={this.activate.bind(this)}
            active={this.state.active}
          />
        </div>
      </div>
    )
  }
}

function VidItem ({ title, vid, handleMovie, active }) {
  return (
    <div
      onClick={() => handleMovie(title, vid)}
      className={`${item} ${title === active ? activeVid : ''}`}
    >
      {title}
    </div>
  )
}

export default Help
