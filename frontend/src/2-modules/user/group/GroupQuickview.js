import React, { Component } from 'react'
import Editor from '../../utilities/Editor'
import ExpanderIcons from '../../utilities/ExpanderIcons'

import './GroupQuickview.css'

class GroupQuickview extends Component {
  expandDescription () {
    document.getElementById('group-page-description').classList.toggle('expand')
  }

  render () {
    console.log(this.props.description)
    return (
      <div id='group-page-quickview'>
        {this.props.admin_access && (
          <Editor superClick={this.props.superClick} />
        )}
        <div id='gradient-overlay' />
        {
          <img
            src='https://www.chem.ucla.edu/houk/houk-group-conf-room-1-august-2017.jpeg'
            id='group-page-coverimage'
          />
        }
        <div id='group-page-name' className='truncate'>
          {this.props.title} - {this.props.description}
        </div>
      </div>
    )
  }
}

export default GroupQuickview
