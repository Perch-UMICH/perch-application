/** @jsx jsx */
import { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { TextInput, TextArea } from '../../../3-utils/Inputs'
import { updateUserProfile } from '../../../backend/UserProfile'

export default class BioAndExperiences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bio: ''
    }
  }

  // called by parent component
  save () {
    let { bio } = this.state
    return updateUserProfile({ bio })
  }

  componentDidMount () {
    this.props.onRef(this)
  }

  render () {
    return (
      <div style={{ width: '500px' }}>
        <TextArea 
          placeholder='Tell us about yourself' 
          size='medium' 
          onChange={e => this.setState({ bio: e.target.value })}
        />
        <div>experiences todo</div>
      </div>
    )
  }
}
