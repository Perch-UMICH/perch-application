/** @jsx jsx */
import { Component } from 'react'
import { css, jsx } from '@emotion/core'
import Floater from '../../1-layouts/Floater'
import { Button } from '../../3-utils/Buttons'
import StudentOrProfessor from './StudentOrProfessor'
import GeneralTextAndFiles from './student/GeneralTextAndFiles'
import ImageBioAndExperiences from './student/ImageBioAndExperiences'
import { getUser, getCurrentUserId, getUserProfile } from '../../backend'

export default class Onboarding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: null,
      stepsLeft: [],
      previousSteps: []
    }
    this.handleNextStep = this.handleNextStep.bind(this)
    this.handlePreviousStep = this.handlePreviousStep.bind(this)
    this.handleLastStep = this.handleLastStep.bind(this)
    this.onRef = this.onRef.bind(this)
  }

  // sets up the initial step the user sees
  componentDidMount () {
    this.setState({ currentStep: this.firstOnboardingStep })
  }

  // the first component the user sees
  get firstOnboardingStep () {
    return (
      <StudentOrProfessor
        onRef={this.onRef}
        handleStudent={this.handleStudent.bind(this)}
        handleFaculty={this.handleFaculty.bind(this)}
      />
    )
  }

  // passed down to children to let parent access its functions via
  // the variable this.childComponentFunctions
  onRef (ref) {
    this.childComponentFunctions = ref
  }

  // gets the next form to be shown to user and calls the save method on current form
  handleNextStep () {
    this.childComponentFunctions.save()
    this.state.previousSteps.push(this.state.currentStep)
    this.state.currentStep = this.state.stepsLeft.shift()
    this.setState(this.state)
  }

  // gets the previous form to be shown to user
  handlePreviousStep () {
    this.state.stepsLeft.unshift(this.state.currentStep)
    this.state.currentStep = this.state.previousSteps.pop()
    this.setState(this.state)
  }

  // handles finishing up onboarding
  handleLastStep () {
    this.childComponentFunctions.save().then(() => {
      window.location.href = '/nothing'
    })
  }

  // determines the next pages the user sees if they pick student
  handleStudent () {
    this.childComponentFunctions.save()
    this.setState({
      previousSteps: [this.state.currentStep],
      stepsLeft: [
        <ImageBioAndExperiences onRef={this.onRef} />,
      ],
      currentStep: <GeneralTextAndFiles onRef={this.onRef} />
    })
  }

  // determines the next pages the user sees if they pick faculty
  handleFaculty () {
    this.childComponentFunctions.save()
    this.setState({
      previousSteps: [this.state.currentStep],
      stepsLeft: [
        <ImageBioAndExperiences onRef={this.onRef} />,
      ],
      currentStep: <GeneralTextAndFiles onRef={this.onRef} />
    })
  }

  // only shows if theres stuff in previousSteps
  renderBackButton () {
    if (this.state.previousSteps.length == 0) return null
    return <Button onClick={this.handlePreviousStep}>Back</Button>
  }

  // only shows if theres stuff in nextSteps and not the first step
  renderNextButton () {
    if (this.state.previousSteps.length == 0) return null
    if (this.state.stepsLeft.length == 0) {
      return <Button onClick={this.handleLastStep}>Finish</Button>
    }
    return <Button onClick={this.handleNextStep}>Next</Button>
  }

  render () {
    return (
      <Floater>
        {this.state.currentStep}
        {this.renderBackButton()}
        {this.renderNextButton()}
      </Floater>
    )
  }
}
