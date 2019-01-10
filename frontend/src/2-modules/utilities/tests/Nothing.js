/**
 * Created by aksha on 7/22/2018.
 */
import React, { Component } from 'react'
import './Nothing.scss'
import Axios from 'axios'

class Nothing extends Component {
  constructor () {
    super()
    Axios.get('http://127.0.0.1:3000/users/1').then(({ data }) =>
      console.log(data)
    )
  }
  render () {
    return <div id='test' />
  }
}

export default Nothing
