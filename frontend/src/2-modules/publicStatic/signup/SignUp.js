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
import './SignUp.scss'
class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      route: '/student-onboarding',
      first_name: '',
      last_name: '',
      password: '',
      email: '',
      type: ''
		}
		
		this.generalHandler = this.generalHandler.bind(this)
  }

  generalHandler (event) {
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
    let { type } = this.state
    let individual = {
      first_name: first_name,
      last_name: last_name,
      contact_email: email
    }
    if (type === 'student') {
      createStudent(id, individual)
        .then(r => (window.location.href = '/student-onboarding'))
        .catch(e => alert('ERROR in student creation'))
    } else {
      createFaculty(id, individual)
        .then(r => (window.location.href = '/faculty-onboarding'))
        .catch(e => alert('ERROR in faculty creation'))
    }
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

  render () {
    let { first_name, last_name, email, password } = this.state
    return (
      <form
        className='left-align signup-container'
        onSubmit={this.generalHandler}
      >
        <div className='new-signup-header'>Sign Up for Free</div>
        <a href='login'>
          <div className='new-signup-sub-header'>
            or <span className='link-color'>login</span> if you have an account
          </div>
        </a>
        <div className='row'>
          <div className='input-field col s6'>
            <input
              id='first_name'
              type='text'
              required
              autoFocus='autofocus'
              onChange={e => this.setState({ first_name: e.target.value })}
              value={first_name}
            />
            <label htmlFor='first_name'>First name</label>
          </div>
          <div className='input-field col s6'>
            <input
              id='last_name'
              type='text'
              required
              autoFocus='autofocus'
              onChange={e => this.setState({ last_name: e.target.value })}
              value={last_name}
            />
            <label htmlFor='last_name'>Last name</label>
          </div>
        </div>
        <div className='input-field col s12'>
          <input
            id='email'
            type='email'
            required
            autoFocus='autofocus'
            onChange={e => this.setState({ email: e.target.value })}
            value={email}
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='input-field col s12'>
          <input
            id='password'
            type='password'
            required
            autoFocus='autofocus'
            onChange={e => this.setState({ password: e.target.value })}
            value={password}
          />
          <label htmlFor='password'>Password</label>
        </div>
        <div className='center-align'>
          <input
            className='radio'
            name='user_type'
            type='radio'
            id='faculty'
            value='faculty'
            required
            autoFocus='autofocus'
            onChange={() => this.setState({ type: 'faculty' })}
          />
          <label className='new-signup-radio' htmlFor='faculty'>
            Faculty
          </label>
          <input
            className='radio'
            name='user_type'
            type='radio'
            id='student'
            value='student'
            required
            autoFocus='autofocus'
            onChange={() => this.setState({ type: 'student' })}
          />
          <label className='new-signup-radio' htmlFor='student'>
            Student
          </label>
        </div>
        <br />
        <button
          className='btn waves-effect waves-blue basic-btn'
          style={{ width: 'calc(100%)', height: '80px' }}
        >
          Make an account
        </button>
        {/* <GoogleLogin
          clientId='426880385373-gttrdhuk9b4g3cuhh95g0nhhnkbt38ek.apps.googleusercontent.com'
          buttonText='Google Signup'
          onSuccess={this.handleGoogleSuccessResponse}
          onFailure={this.handleGoogleFailureResponse}
					className='google-login btn waves-effect basic-btn'
        /> */}
      </form>
    )
  }
}

export default SignUp
