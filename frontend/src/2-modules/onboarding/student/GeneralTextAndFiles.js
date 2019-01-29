/** @jsx jsx */
import { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { TextInput } from '../../../3-utils/Inputs'
import { updateUserProfile } from '../../../backend/UserProfile'
import UploadImage from '../../user/maintenance/UploadImage'
import FileUpload from '../../../3-utils/FileUploads';

export default class GeneralTextAndFiles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contactPhone: ''
    }
  }

  componentDidMount () {
    this.props.onRef(this)
  }

  save () {
    let { contactPhone } = this.state
    return updateUserProfile({ contactPhone })
  }

  render () {
    return (
      <div>
        <UploadImage
          user={this.state.user}
          updateUser={() => null}
        />
        <TextInput
          placeholder='phone'
          type='text'
          onChange={e => this.setState({ contactPhone: e.target.value })}
        />
        <FileUpload />
        {/* phone email bio university (optional) list of experiences list of
        degrees list of certifications list of honors list of links resume
        picture */}
      </div>
    )
  }
}
