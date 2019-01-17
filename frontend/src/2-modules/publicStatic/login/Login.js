/* These are Google Login objects that need to be declared */
/* global gapi */
/* global initClient */
/* global updateSigninStatus */
import React, { Component } from 'react'
import Floater from '../../../1-layouts/Floater'
import './Login.css'
import GoogleLogin from '../../publicStatic/signup/GoogleLogin'
import {
  isLoggedIn,
  loginOrSignup
  // loginUser,
  // getCurrentUserId,
  // isStudent,
  // getCurrentFacultyId
} from '../../../backend/index.js'

import { TextInput, SubmitInput } from '../../../3-utils/Inputs'

import iziToast from 'izitoast'
import { access } from 'fs'

class Login extends Component {
  constructor (props) {
    super(props)
    console.log("hello Login")
    this.state = {
      email: '',
      password: ''
    }

    this.updateState = this.updateState.bind(this)
    this.handleGoogleFailureResponse = this.handleGoogleFailureResponse.bind(
      this
    )
    this.handleGoogleSuccessResponse = this.handleGoogleSuccessResponse.bind(
      this
    )
  }

  // called when user tries to login
  handleLogin (event) {
    alert('todo')
    // event.preventDefault()

    // let email = this.state.email
    // let password = this.state.password

    // // 1. Login user
    // loginUser(email, password)
    //   .then(
    //     resp =>
    //       (window.location.href = isStudent()
    //         ? `/student-profile/${getCurrentUserId()}`
    //         : `/prof/${getCurrentFacultyId()}`)
    //   )

    //   // 2. or show Error message
    //   .catch(e =>
    //     iziToast.show({
    //       title: 'Error',
    //       titleColor: 'black',
    //       messageColor: 'black',
    //       message: 'Incorrect Username or Password',
    //       color: 'red',
    //       position: 'bottomLeft',
    //       progressBarColor: 'white',
    //       timeout: '5000',
    //       class: 'toast-custom'
    //     })
    //   )
  }

  updateState (key, value) {
    this.state[key] = value
    this.setState(this.state)
  }

  handleGoogleSuccessResponse (e) {
    let token = e.tokenId
    loginOrSignup({ token }).then(r => {
      if(r.error) {
        // Backend likely rejected the user for some reason
        // Should be rare outside of a serious backend issue with network, overload, etc.

      } else {
        // Logged in!
      }
    })
  }

  handleGoogleFailureResponse () {
    // User failed to login through Google button
    alert('failure')
  }

  render () {
    return (
      <Floater>
        <div className='login shadow'>
          <h1>LogIn</h1>
          <TextInput
            type='email'
            name='email'
            label='Email'
            updateParent={this.updateState}
          />
          <TextInput
            type='password'
            name='password'
            label='Password'
            updateParent={this.updateState}
          />
          <GoogleLogin
            clientId='1020193337249-cn3j2veuabvf0eha7vgru2hlhtpkuunh.apps.googleusercontent.com'
            buttonText='Google Signup'
            onSuccess={this.handleGoogleSuccessResponse}
            onFailure={this.handleGoogleFailureResponse}
          />
        </div>
      </Floater>
    )
  }
}

export default Login
