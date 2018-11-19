import React, { Component } from 'react'
import BasicButton from '../../utilities/buttons/BasicButton'
import SignUp from '../signup/SignUp'
import Typed from 'typed.js'
import {
  atf,
  text,
  header,
  movingText,
  tempSignup
} from './AboveTheFold.module.scss'

class AboveTheFold extends Component {
  componentDidMount () {
    var options = {
      strings: [
        'research',
        'finding a lab',
        'finding lab assistants',
        'learning lab skills',
        '<b>making an impact</b>'
      ],
      typeSpeed: 75
    }
    var typed = new Typed('#changer', options)
  }

  render () {
    return (
      <div className={`${atf} row`}>
        <div className={`col s12 m7 ${movingText} valign-wrapper`}>
          <div className='container center-align'>
            <div className={`${header} left-align`}>
              deawkwardizing <br /><span id='changer' />
            </div>
            <div className={`${text} left-align`}>
              Perch's centralized matching system helps you find the best lab or lab assistant, while Perch Certifications streamlines basic skills training
            </div>
          </div>
        </div>

        {/* <div className='hide-on-med-and-up center-align' style={{marginBottom: '20px'}}> */}
        {/* <BasicButton dest='sign-up' msg='sign up'/><BasicButton dest='login' msg='log in'/> */}
        {/* </div> */}

        <div className='col s12 m5 valign-wrapper'>
          {/* <SignUp /> */}

          <div className={tempSignup}>
            <a href='/join'>
              We're looking for people <u>to join the team!</u>
            </a>
          </div>
        </div>

      </div>
    )
  }
}

export default AboveTheFold
