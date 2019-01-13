import React, {Component} from 'react'
import EditModal from '../../../utilities/modals/ModalContainer'
import {
  EditContact,
  EditExperience,
  EditQuickview,
  EditLinks,
  EditBio
} from '../StudentEditors'

import PickYourInterests from '../PickYourInterests'

export default class Modals extends Component {
  render() {
    return (
      <div>
        {/* <EditModal
          id='skills-interests-edit'
          title='Edit Skills and Interests'
          noPadding
        >
          <PickYourInterests
            modalEdit
            editorOnly
            user={this.props}
            updateUser={this.props.updateUser }
          />
        </EditModal> */}
        {/* <EditModal
          id='contact-edit'
          title='Edit Contact Info'
          modalAction={this.props.sendContactInfo }
        >
          <EditContact
            modalEdit
            user={this.props}
            updateUser={this.props.updateUser }
          />
        </EditModal>
        <EditModal
          id='link-edit'
          title='Edit Links'
          modalAction={this.props.sendLinks }
        >
          <EditLinks
            modalEdit
            user={this.props}
            updateUser={this.props.updateUser }
          />
        </EditModal>
        <EditModal
          id='work-edit'
          title='Edit Work Info'
          modalAction={this.props.sendExperiences }
        >
          <EditExperience
            type='work'
            modalEdit
            user={this.props}
            updateUser={this.props.updateUser }
          />
        </EditModal>
        <EditModal
          id='bio-edit'
          title='Edit Bio'
          modalAction={this.props.sendBio }
        >
          <EditBio
            modalEdit
            user={this.props}
            updateUser={this.props.updateUser }
          />
        </EditModal>
        <EditModal
          id='quickview-edit'
          title='Edit Quickview Info'
          modalAction={this.props.sendHeaderInfo }
        >
          <EditQuickview
            modalEdit
            img={this.props.img}
            user={this.props}
            updateUser={this.props.updateUser }
          />
        </EditModal> */}
      </div>
    )
  }
}