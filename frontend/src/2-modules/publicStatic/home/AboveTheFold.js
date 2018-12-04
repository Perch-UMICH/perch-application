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
              de-awkward-izing <br /><span id='changer' />
            </div>
            <div className={`${text} left-align`}>
              You can find Michigan labs here
            </div>
          </div>
        </div>

        <div className='col s12 m5 valign-wrapper'>

          <div className={tempSignup}>
            <SignUp />
          </div>
        </div>

      </div>
    )
  }
}

export default AboveTheFold
