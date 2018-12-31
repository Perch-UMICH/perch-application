import React from 'react'

import {
  TextInput,
  RadioInput,
  SubmitInput,
  InputRow
} from '../../../3-utils/Inputs'

export default function (props) {
  return (
    <div className='signup-container'>
      <h1>Sign Up for Free</h1>
      <InputRow>
        <TextInput
          type='text'
          name='firstName'
          label='First Name'
          updateParent={props.updateParent}
        />
        <TextInput
          type='text'
          name='lastName'
          label='Last Name'
          updateParent={props.updateParent}
        />
      </InputRow>
      <TextInput
        type='email'
        name='email'
        label='Email'
        updateParent={props.updateParent}
      />
      <TextInput
        type='password'
        name='password'
        label='Password'
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
      {/* <GoogleLogin
          clientId='426880385373-gttrdhuk9b4g3cuhh95g0nhhnkbt38ek.apps.googleusercontent.com'
          buttonText='Google Signup'
          onSuccess={this.handleGoogleSuccessResponse}
          onFailure={this.handleGoogleFailureResponse}
					className='google-login btn waves-effect basic-btn'
        /> */}
    </div>
  )
}
