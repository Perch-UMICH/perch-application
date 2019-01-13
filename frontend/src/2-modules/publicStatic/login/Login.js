import React, { Component } from 'react'
import Floater from '../../../1-layouts/Floater'
import './Login.css'
import {
  loginUser,
  getCurrentUserId,
  isStudent,
  getCurrentFacultyId
} from '../../../backend/index.js'

import {
  TextInput,
  SubmitInput,
} from '../../../3-utils/Inputs'

import iziToast from 'izitoast'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.updateState = this.updateState.bind(this)
  }

  // called when user tries to login
  handleLogin (event) {
    event.preventDefault()

    let email = this.state.email
    let password = this.state.password

    // 1. Login user
    loginUser(email, password)
      .then(
        resp =>
          (window.location.href = isStudent()
            ? `/student-profile/${getCurrentUserId()}`
            : `/prof/${getCurrentFacultyId()}`)
      )

      // 2. or show Error message
      .catch(e =>
        iziToast.show({
          title: 'Error',
          titleColor: 'black',
          messageColor: 'black',
          message: 'Incorrect Username or Password',
          color: 'red',
          position: 'bottomLeft',
          progressBarColor: 'white',
          timeout: '5000',
          class: 'toast-custom'
        })
      )
  }

  updateState(key, value) {
    this.state[key] = value
    this.setState(this.state)
  }

  render () {
    return (
      <Floater>
        <div className='login shadow' >
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
          <SubmitInput onClick={this.handleLogin.bind(this)}>Login</SubmitInput>
        </div>
      </Floater>
    )
  }
}

export default Login
