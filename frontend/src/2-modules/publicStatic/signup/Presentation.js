import React from 'react'

import {
  TextInput,
  RadioInput,
  SubmitInput,
  InputRow
} from '../../../3-utils/Inputs'

import GoogleLogin from './GoogleLogin'

export default function (props) {
  return (
    <div className='signup-container'>
      <h1>Sign Up for Free</h1>
      <InputRow>
        <TextInput
          type='text'
          name='firstName'
          placeholder='First Name'
          updateParent={props.updateParent}
        />
        <TextInput
          type='text'
          name='lastName'
          placeholder='Last Name'
          updateParent={props.updateParent}
        />
      </InputRow>
      <TextInput
        type='email'
        name='email'
        placeholder='Email'
        updateParent={props.updateParent}
      />
      <TextInput
        type='password'
        name='password'
        placeholder='Password'
        updateParent={props.updateParent}
      />
      <InputRow>
        <RadioInput
          name='type'
          label='Faculty'
          value='faculty'
          updateParent={props.updateParent}
        />
        <RadioInput
          name='type'
          label='Student'
          value='student'
          updateParent={props.updateParent}
        />
      </InputRow>
      <SubmitInput onClick={props.handleSubmit}>Make An Account</SubmitInput>
      { <GoogleLogin
          clientId='1020193337249-cn3j2veuabvf0eha7vgru2hlhtpkuunh.apps.googleusercontent.com'
          buttonText='Google Signup'
          onSuccess={props.handleGoogleSuccessResponse}
          onFailure={props.handleGoogleFailureResponse}
					className='google-login btn waves-effect basic-btn'
        /> }
    </div>
  )
}
