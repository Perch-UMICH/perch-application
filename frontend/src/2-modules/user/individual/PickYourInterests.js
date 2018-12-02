import React, { Component } from 'react'
import BubbleChoice from '../../utilities/BubbleChoice'
import { EditContainerOnboarding } from './StudentEditors'
import { deepCopy, exists } from '../../../helper.js'

class PickYourInterests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bubble_array: [],
      tags: [],
      skills: []
    }
    this.updateBubbleChoice = this.updateBubbleChoice.bind(this)
  }

  componentWillReceiveProps (props) {
    let { tags, skills } = props.user
    this.setState({ tags, skills })
  }

  updateBubbleChoice (bubble_array, skills) {
    let updateUser = this.props.updateUser
    if (updateUser) {
      let type = skills ? 'skills' : 'tags'
      updateUser(type, bubble_array)
    }
  }

  render () {
    let { tags, skills } = this.state
    let editorOnly = this.props.editorOnly

    var skillsDisplayInfo = {
      placeholder_txt: 'search skills',
      header_txt: 'your skills',
      interests: skills
    }
    var interestsDisplayInfo = {
      placeholder_txt: 'search interests',
      header_txt: 'your interests',
      interests: tags
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
    } else {
      return (
        <EditContainerOnboarding title='Skills and Interests'>
          {bubblePickers}
        </EditContainerOnboarding>
      )
    }
  }
}

export default PickYourInterests
