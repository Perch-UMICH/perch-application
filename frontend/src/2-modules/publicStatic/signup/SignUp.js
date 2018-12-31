/* These are Google Login objects that need to be declared */
/* global gapi */
/* global initClient */
/* global updateSigninStatus */
import React, { Component } from 'react'
import GoogleLogin from './GoogleLogin.js'
import GoogleLogout from './GoogleLogout.js'
import {
  registerUser,
  createStudent,
  getCurrentUserId,
  loginUser,
  loginUserIdp,
  signupUserIdp,
  createFaculty
} from '../../../helper.js'
import Presentation from './Presentation'
import './SignUp.scss'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      type: ''
    }
    this.updateState = this.updateState.bind(this)
    this.registerLoginCreate = this.registerLoginCreate.bind(this)
  }

  registerLoginCreate (event) {
    event.preventDefault()
    let { email, password, first_name, last_name } = this.state
    registerUser(`${first_name} ${last_name}`, email, password, password)
      .catch(e => console.log('Register Error'))
      .then(r => loginUser(email, password))
      .catch(e => console.log('Login Error'))
      .then(r => this.createAccount(email, first_name, last_name))
  }

  // relies on register and login to create a user and put id info in local storage to then create a student
  createAccount (email, first_name, last_name) {
    let id = getCurrentUserId()
    let individual = { first_name, last_name, email }
    this.state.type === 'student'
      ? createStudent(id, individual)
        .then(r => (window.location.href = '/student-onboarding'))
        .catch(e => alert('ERROR in student creation'))
      : createFaculty(id, individual)
        .then(r => (window.location.href = '/faculty-onboarding'))
        .catch(e => alert('ERROR in faculty creation'))
  }

  handleGoogleSuccessResponse = response => {
    console.log(response)
    signupUserIdp('blah', 'google', response.tokenId)
  }

  handleGoogleFailureResponse = response => {
    console.log('Google login failed')
  }

  signOut = () => {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
  }

  updateState (key, value) {
    this.state[key] = value
    this.setState(this.state)
  }

  render () {
    return (
      <Presentation
        {...this.state}
        updateParent={this.updateState}
        handleSubmit={this.registerLoginCreate}
      />
    )
  }
}

export default SignUp
