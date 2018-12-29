import React, { Component } from 'react'
import ExpanderIcons from '../../../utilities/ExpanderIcons'
import Editor from '../../../utilities/Editor'
import { openModal } from '../../../../helper'

export default class UserWorkExperience extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showExpander: false,
      description: ''
    }
  }

  componentDidMount () {
    if (this.state.description.length >= 250) {
      this.setState({ showExpander: true })
    }
  }

  expand () {
    document
      .getElementById(`user-work-description-${this.props.title}`)
      .classList.toggle('expand')
  }

  render () {
    var work_experiences = this.props.work_experiences ? this.props.work_experiences : []

    let experiences = work_experiences.map((expObj, index) => {
      return (
        <div
          key={`user-work-${index}`}
          id={`user-work-${expObj.title}`}
          className='user-work-experience'
        >
          <div className='user-work-title'>{expObj.title}</div>
          <div className='user-work-time'>
            {`${expObj.start_date} - ${expObj.end_date}`}
          </div>
          <div
            id={`user-work-description-${expObj.title}`}
            className='user-work-description'
          >
            {expObj.description}
          </div>
          {this.state.showExpander && (
            <ExpanderIcons
              id={`user-work-${'title'}`}
              action={this.expand.bind(this)}
            />
          )}
        </div>
      )
    })

    return (
      <div className='user-work-experience-container'>
        <h1>Experience</h1>
        {experiences}
        {!experiences.length && (
          <div style={{ padding: '10px 20px', color: 'lightgrey' }}>
            Freelance netflix reviewer
          </div>
        )}
        <Editor
          permissions={this.props.owner}
          superClick={() => openModal('work-edit')}
        />
      </div>
    )
  }
}