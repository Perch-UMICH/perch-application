import React, { Component } from 'react'
import ExpanderIcons from '../../../utilities/ExpanderIcons'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'

export default class UserBio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showExpander: false
    }
  }

  componentWillReceiveProps () {
    // if (this.props.children.length >= 20)
    this.setState({ showExpander: true })
  }

  expand () {
    document.getElementById('user-bio-content').classList.toggle('expand')
  }

  render () {
    return (
      <div id='user-bio' className='user-bio'>
        <div id='user-bio-content' className='user-bio-content'>
          {!this.props.bio.length && (
            <div style={{ color: 'lightgrey' }}>
              Superstar, worldwide phenomenon
            </div>
          )}
          {this.props.bio}
        </div>
        {this.state.showExpander && (
          <ExpanderIcons id={`user-bio`} action={this.expand.bind(this)} />
        )}
        <Editor
          permissions={this.props.owner}
          superClick={() => openModal('bio-edit')}
        />
      </div>
    )
  }
}