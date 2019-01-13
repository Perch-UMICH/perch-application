import React, { Component } from 'react'
import LabSearch from './LabSearch'
import { getAllLabs, getLabTags, isLoggedIn } from '../../backend/index.js'
import ErrorPage from '../utilities/ErrorPage'

class LabMaster extends Component {
  render () {
    if (isLoggedIn()) {
      return (
        <div className='shift-down'>
          <LabSearch />
        </div>
      )
    } else {
      return <ErrorPage />
    }
  }
}

export default LabMaster
