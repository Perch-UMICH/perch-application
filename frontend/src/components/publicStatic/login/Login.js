import React, { Component } from 'react'
import './Login.css'
import {
  isLoggedIn,
  loginUser,
  getCurrentUserId,
  isStudent,
  isLab,
  isFaculty,
  getCurrentLabId,
  getCurrentFacultyId
} from '../../../helper.js'
import alertify from 'alertify.js'
import iziToast from 'izitoast'

class Login extends Component {
  handleLogin (event) {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    loginUser(email, password).then(resp => {
      console.log(resp)
      if (resp) {
        if (isStudent()) { window.location.href = `/student-profile/${getCurrentUserId()}` } else if (isFaculty()) { window.location.href = `/prof/${getCurrentFacultyId()}` }
      } else {
        // alertify.error("Incorrect Username and Password");
        iziToast.show({
          title: 'Error',
          titleColor: 'white',
          messageColor: 'white',
          message: 'Incorrect Username or Password',
          color: 'red',
          position: 'bottomLeft',
          progressBarColor: 'white'
        })
      }
    })
  }

  render () {
    return (
      <div className='login-container valign-wrapper'>
        <form className='container login shadow' onSubmit={this.handleLogin}>
          <div className='new-signup-header center-align'>LOG IN</div>
          <div className='input-field'>
            <input id='email' type='email' required autofocus='autofocus' />
            <label htmlFor='email'>Email</label>
          </div>
          <div className='input-field'>
            <input
              id='password'
              type='password'
              required
              autofocus='autofocus'
            />
            <label htmlFor='password'>Password</label>
          </div>
          <br />
          <button
            className='btn waves-effect waves-blue waves-light basic-btn'
            style={{ width: '100%', height: '50px' }}
            name='action'
          >
            <i className='material-icons'>lock_open</i>
          </button>
        </form>
      </div>
    )
  }
}

export default Login
