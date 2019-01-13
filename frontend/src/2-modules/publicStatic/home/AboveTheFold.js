import React, { Component } from 'react'
import SignUp from '../signup/SignUp'
import Typed from 'typed.js'
import {
  atf,
  text,
  header,
  movingText,
  tempSignup
} from './AboveTheFold.module.scss'

import {
  VerticalSplit,
  SplitLeft,
  SplitRight
} from '../../../1-layouts/VerticalSplit'
import Floater from '../../../1-layouts/Floater'

function AboveTheFold () {
  return (
    <div className={atf}>
      <VerticalSplit>
        <SplitLeft>
          <MovingTitle />
        </SplitLeft>
        <SplitRight>
          <Floater>
            <SignUp />
          </Floater>
        </SplitRight>
      </VerticalSplit>
    </div>
  )
}








class MovingTitle extends Component {
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
    let typed = new Typed('#changer', options)
  }
  render () {
    return (
      <div className={movingText}>
        <Floater>
          <div className={header}>
            de-awkward-izing <br />
            <span id='changer' />
          </div>
          <div className={text}>Your one stop shop for research labs</div>
        </Floater>
      </div>
    )
  }
}

export default AboveTheFold
