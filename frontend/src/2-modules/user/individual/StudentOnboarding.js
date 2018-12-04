import React, { Component } from 'react'
import BasicButton from '../../utilities/buttons/BasicButton'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import $ from 'jquery'
import './StudentEditors.scss'
import { EditContact } from './StudentEditors'
import ProgressIndicator from '../../utilities/ProgressIndicator'
import EnterContact from './EnterContact'
import EnterBio from './EnterBio'
import PickYourInterests from './PickYourInterests'
import NotableClasses from './NotableClasses'
import UploadImage from '../maintenance/UploadImage'
import Experience from './Experience'
import Education from './Education'
import Links from './Links'
import {
  getCurrentUserId,
  getStudentFromUser,
  updateStudent,
  addSkillsToStudent,
  addTagsToStudent,
  addWorkExperienceToStudent,
  addEduExperienceToStudent,
  primeExternalLink,
  uploadUserProfilePic
} from '../../../helper.js'
import './StudentOnboarding.scss'

class StudentOnboarding extends Component {
  constructor (props) {
    super(props)
    this.sendUpdate = this.sendUpdate.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.updateExperience = this.updateExperience.bind(this)
    this.sendAcademicInfo = this.sendAcademicInfo.bind(this)

    this.state = {
      curStep: 0,
      numSteps: 4,
      user: {
        year: 'None Selected',
        classes: [],
        bio: ''
      }
    }
  }

  componentDidMount () {
    /* Get student information and prefill form */
    getStudentFromUser(getCurrentUserId()).then(({ data }) =>
      this.setState({ user: data })
    )
  }

  sendUpdate (redirect) {
    /* updates student object every time user presses next or back */
    var user = this.state.user
    user.linkedin_link = user.linkedin_link
      ? primeExternalLink(user.linkedin_link)
      : ''

    updateStudent(user)
      .then(r => {
        if (redirect) window.location = '/student-profile/' + getCurrentUserId()
      })
      .then(r => {
        // update profile picture
        if (user.img) {
          if (!user.crop) {
            user.crop = {
              x: 0.5,
              y: 0.5,
              rotate: 0,
              scale: 1
            }
          }

          let formData = new FormData()
          formData.append('file', user.img)

          let to_return = {
            formData: formData,
            type: 'profile_pic',
            x: user.crop.x,
            y: user.crop.y,
            scale: user.crop.scale,
            user_id: getCurrentUserId(),
          }

          return uploadUserProfilePic(to_return)
        }
      })
      .catch(e => alert('ERROR'))
  }

  sendAcademicInfo () {
    var class_arr = []
    if (this.state.user.classes) {
      this.state.user.classes.map(c => {
        class_arr.push(c.name)
      })
    }
    var major_arr = []
    major_arr.push(this.state.user.major)

    addEduExperienceToStudent(
      this.state.user.university,
      'start',
      'end',
      true,
      this.state.user.year,
      this.state.user.gpa,
      class_arr,
      major_arr
    ).then(resp => {
      getStudentFromUser(getCurrentUserId()).then(r => {})
    })
  }

  updateTags () {
    let { skills, tags } = this.state.user

    if (skills.length) {
      skills = skills.map(skill => skill.id)
      addSkillsToStudent(skills)
    }
    
    if (tags.length) {
      tags = tags.map(interest => interest.id)
      addTagsToStudent(tags)
    }
  }

  updateExperience () {
    if (
      this.state.user.work_experiences &&
      this.state.user.work_experiences.length
    ) {
      this.state.user.work_experiences.map(exp => {
        addWorkExperienceToStudent(exp).then(r => {
          getStudentFromUser(getCurrentUserId()).then(r2 => {})
        })
      })
    }
  }

  updateUser (field, newValue) {
    var newState = this.state
    newState.user[field] = newValue
    this.setState(newState)
  }

  render () {
    var backBtn = (
      <BasicButton
        msg='back'
        superClick={() => {
          this.setState({ curStep: this.state.curStep - 1 })
          this.sendUpdate()
        }}
      />
    )
    var nextBtn = (
      <BasicButton
        msg='next'
        superClick={() => {
          this.setState({ curStep: this.state.curStep + 1 })
          this.sendUpdate()
        }}
      />
    )

    var firstPage = <div id='first-page'>
      <UploadImage
        showContact
        user={this.state.user}
        updateUser={this.updateUser.bind(this)}
      />
      <div>
        <EnterContact
          user={this.state.user}
          updateUser={this.updateUser.bind(this)}
        />
        <Links
          user={this.state.user}
          updateUser={this.updateUser.bind(this)}
        />
      </div>
      
    </div>

    var steps = {
      0: {
        comp: [
          firstPage
        ],
        text:
          "Welcome to Perch! We'll begin by gathering some information about you to set up your profile."
      },
      1: {
        comp: (
          <PickYourInterests
            user={this.state.user}
            updateUser={this.updateUser.bind(this)}
          />
        ),
        text:
          'Search skills and interests that apply to you, and click on the bubbles to add them to your profile.'
      },
      // 2: {
      //   comp: '',
      //   text: 'Enter your school and your GPA, major (or intended major), class year, and relevant classes for this school.'
      // },
      2: {
        comp: (
          <Experience
            user={this.state.user}
            updateUser={this.updateUser.bind(this)}
          />
        ),
        text:
          'Enter any relevant lab or work experience and a short description of your contributions.'
      },
      3: {
        comp: (
          <EnterBio
            user={this.state.user}
            updateUser={this.updateUser.bind(this)}
          />
        ),
        text:
          'Enter a short description to describe yourself research interests and experience.' // add word limit
      }
    }
    var stepToRender = steps[this.state.curStep]
    if (this.state.curStep === 0) {
      backBtn = null
    } else if (this.state.curStep === this.state.numSteps - 1) {
      nextBtn = (
        <BasicButton
          msg='go to profile'
          superClick={() => this.sendUpdate(true)}
        />
      )
    }
    var css = 'invisible'
    if (this.state.curStep === 1) {
      nextBtn = (
        <BasicButton
          msg='next'
          superClick={() => {
            this.setState({ curStep: this.state.curStep + 1 })
            this.updateTags()
          }}
        />
      )
    }
    // if (this.state.curStep === 2) {
    //   css = 'visible-yes'
    //   nextBtn = (
    //     <BasicButton
    //       msg='next'
    //       superClick={() => {
    //         this.setState({ curStep: this.state.curStep + 1 })
    //         this.sendAcademicInfo()
    //       }}
    //     />
    //   )
    // }
    if (this.state.curStep === 2) {
      nextBtn = (
        <BasicButton
          msg='next'
          superClick={() => {
            this.setState({ curStep: this.state.curStep + 1 })
            this.updateExperience()
          }}
        />
      )
    }
    var dropDown = (
      <div className={css}>
        <NotableClasses
          user={this.state.user}
          showForm
          showAllEducation
          updateUser={this.updateUser.bind(this)}
        />
      </div>
    )
    return (
      <div className='onboarding-container'>
        <div>
          <ProgressIndicator
            steps={this.state.numSteps}
            curStep={this.state.curStep}
          />
          <div className='onboarding-text'>{stepToRender.text}</div>
          {dropDown}
          {stepToRender.comp}
          {backBtn}
          {nextBtn}
        </div>
      </div>
    )
  }
}

export default StudentOnboarding
