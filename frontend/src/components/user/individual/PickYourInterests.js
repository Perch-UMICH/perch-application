import React, { Component } from 'react'
import BubbleChoice from '../../utilities/BubbleChoice'
import { EditContainerOnboarding } from './StudentEditors'
import { deepCopy, exists } from '../../../helper.js'

class PickYourInterests extends Component {
  constructor (props) {
    super(props)
    let {interests, skills} = props.user

    this.state = {
      bubble_array: [],
      interests: interests ? deepCopy(interests) : [],
      skills: skills ? deepCopy(skills) : []
    }

    this.updateBubbleChoice = this.updateBubbleChoice.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.user) {
      let { interests, skills } = props.user
      if (exists(interests)) {
        this.setState({ interests: deepCopy(interests) })
      }
      if (exists(skills)) {
        this.setState({ skills: deepCopy(skills) })
      }
    }
  }

  redirect () {
    window.location = this.state.dest
  }

  updateBubbleChoice (choices, skills) {
    let updateUser = this.props.updateUser
    this.setState({ bubble_array: choices })
    if (updateUser) {
      var type = skills ? 'skills' : 'interests'
      updateUser(type, choices)
    }
  }

  render () {
    let { interests, skills } = this.state
    let editorOnly = this.props.editorOnly

    var skillsDisplayInfo = {
      placeholder_txt: 'search skills',
      header_txt: 'your skills',
      interests: skills
    }
    var interestsDisplayInfo = {
      placeholder_txt: 'search interests',
      header_txt: 'your interests',
      interests: interests
    }

    var bubblePickers = (
      <div>
        <BubbleChoice
          ref='bubble_choice'
          skills
          display_info={skillsDisplayInfo}
          callbackSkills={this.updateBubbleChoice}
        />
        <BubbleChoice
          ref='bubble_choice'
          skills={false}
          display_info={interestsDisplayInfo}
          callbackSkills={this.updateBubbleChoice}
        />
      </div>
    )

    if (editorOnly) {
      return bubblePickers
    }

    return (
      <EditContainerOnboarding
        title='Skills and Interests'
        redirect={this.redirect.bind(this)}
      >
        {bubblePickers}
      </EditContainerOnboarding>
    )
  }
}

export default PickYourInterests
