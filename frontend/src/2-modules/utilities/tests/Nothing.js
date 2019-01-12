/**
 * Created by aksha on 7/22/2018.
 */
import React, { Component } from 'react'
import './Nothing.scss'
import Axios from 'axios'
import {getUser} from '../../../backend/UserProfile'

class Nothing extends Component {
  constructor () {
    super()
    getUser({user_id: 1})
      .then(response => {
        console.log(response)
      })

  }
  render () {
    return <div id='test' />
  }
}

export default Nothing
