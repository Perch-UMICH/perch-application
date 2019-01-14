import React, { Component } from 'react'
import BubbleChoice from '../../utilities/BubbleChoice'
import { EditContainerOnboarding } from './StudentEditors'
// import { syncSkillsToStudent, syncTagsToStudent } from '../../../backend/index'
let syncSkillsToStudent, syncTagsToStudent
class PickYourInterests extends Component {
  constructor (props) {
    super(props)
    let user = props.user
    this.state = {
      bubble_array: [],
      tags: user.tags,
      skills: user.skills
    }
    this.updateBubbleChoice = this.updateBubbleChoice.bind(this)
  }

  // retrieves skills and tag arrays from parent state
  componentWillReceiveProps (props) {
    let { tags, skills } = props.user
    this.setState({ tags, skills })
  }

  // updates skill or tag attribute in parent state object and backend
  updateBubbleChoice (bubble_array, skills_flag) {
    let type = skills_flag ? 'skills' : 'tags'
    let bubble_ids = bubble_array.map(r => r.id)
    if (type == 'skills') syncSkillsToStudent(bubble_ids)
    else syncTagsToStudent(bubble_ids)
    this.props.updateUser(type, bubble_array)
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
          passChosen={this.updateBubbleChoice}
        />
        <BubbleChoice
          ref='bubble_choice'
          skills={false}
          display_info={interestsDisplayInfo}
          passChosen={this.updateBubbleChoice}
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
