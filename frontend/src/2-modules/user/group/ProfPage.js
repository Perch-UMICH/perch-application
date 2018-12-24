import React, { Component } from 'react'
import {
  updateFaculty,
  createLab,
  isLoggedIn,
  getCurrentFacultyId,
  getUserLabs,
  getFaculty,
  isStudent,
  isFaculty,
  getUserProfilePic,
  uploadUserProfilePic
} from '../../../helper.js'
import ExpanderIcons from '../../utilities/ExpanderIcons'
import Editor from '../../utilities/Editor'
import EditModal from '../../utilities/modals/EditModal'
import CreateLab, { modalCreateLab, modalDeleteLab } from '../CreateLab'
import ErrorPage from '../../utilities/ErrorPage'
import {
  EditContact,
  EditExperience,
  EditQuickview,
  EditLinks
} from '../individual/StudentEditors'
import './ProfPage.css'

// Handles opening of component editing modals
function openModal (id) {
  if (document.getElementById(id)) {
    document.getElementById(id).classList.add('activated')
    document.getElementById(`${id}-backdrop`).classList.add('activated')
  }
}

/*

Each faculty page has a specific <user id>, <email>, <img>, <phone number>, and <list of labs>
that they are a part of.

loading_labs is active while the labs are loading, and no_lab indicates this lab does not exist
selected lab is exclusively used for deleting a lab, but might not be necessary if we don't delete
on this page

*/

class ProfPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labs: [],
      user_id: null,
      prof_id: null,
      contact_email: '',
      contact_phone: '',
      image:
        'https://homewoodfamilyaz.org/wp-content/uploads/2017/04/square_profile_pic_male.png',
      selected_lab: {},
      no_lab: false,
      loading_labs: true
    }
  }

  // loads the faculty info, the labs they're a part of, and permissions
  componentDidMount () {
    if (isLoggedIn()) {
      this.loadFaculty()
      this.loadLabs()
      this.determinePermissions()
    }
  }

  // either creates or deletes lab
  getModalAction (create) {
    let { lab, selected_lab } = this.state
    let loadLabs = this.loadLabs.bind(this)

    if (create) {
      modalCreateLab(lab, id => (window.location = `/prof-page/${id}`))
    } else {
      modalDeleteLab(selected_lab, loadLabs)
    }
  }

  // loads the labs a user is a part of
  loadLabs () {
    let { user_id } = this.state
    getUserLabs(user_id).then(r => {
      this.setState({ labs: r.data, loading_labs: false })
    })
  }

  // loads the faculty name, email, phone, id, and labs its in
  loadFaculty () {
    let prof_id = window.location.pathname.split('/')[2]
    // set initial faculty info
    getFaculty(prof_id)
      .then(r => {
        let { first_name, contact_email, contact_phone, user_id } = r.data
        this.setState({
          name: first_name,
          contact_email: contact_email,
          contact_phone: contact_phone,
          user_id: user_id,
          prof_id: prof_id
        })
      })
      // grabs profile picture and labs asynchronously
      .then(r => {
        let { user_id, image } = this.state
        getUserProfilePic(user_id).then(r =>
          this.setState({ image: r.data.url || image })
        )
        getUserLabs(user_id).then(r =>
          this.setState({ labs: r.data, loading_labs: false })
        )
      })
      .catch(e => console.log('Error in load faculty somewhere'))
  }

  // sends sends email and phone number to backend
  sendContactInfo () {
    let { contact_email, contact_phone } = this.state
    let contact_info = { contact_email, contact_phone }
    updateFaculty(getCurrentFacultyId(), contact_info).then(r =>
      this.loadFaculty()
    )
  }

  // updates image and name
  // img is an image object that only appears if a new image was added
  // image is the normal url we use for src in the img html tag
  sendQuickviewInfo () {
    let { img, crop, user_id } = this.state
    let imageInfo = new FormData()
    imageInfo.append('file', img)
    let to_return = {
      formData: imageInfo,
      type: 'profile_pic',
      x: crop.x,
      y: crop.y,
      scale: crop.scale,
      user_id: user_id
    }

    if (img) {
      uploadUserProfilePic(to_return)
        .then(r => this.setState({ image: r.data.url }))
        .catch(console.log('error'))
    }
    updateFaculty(this.state.prof_id, { first_name: this.state.name })
  }

  // this just updates the state object, not the backend
  // generic updater for passing through to children
  updateUser (field, newValue) {
    this.state[field] = newValue
    this.setState(this.state)
  }

  // determins if person viewing page is owner of the page
  determinePermissions () {
    let user_id = window.location.pathname.split('/')[2]
    let owner = false
    if (isStudent()) this.setState({ user_type: 'user' })
    else if (isFaculty()) {
      if (getCurrentFacultyId() == user_id) owner = true
      this.setState({ user_type: 'faculty', owner })
    }
  }

  // creates lab in the backend
  handleLabCreation () {
    let {
      new_lab_name,
      new_lab_email,
      new_lab_phone,
      new_lab_description
    } = this.state
    let lab = {
      name: new_lab_name,
      email: new_lab_email,
      phone: new_lab_phone,
      description: new_lab_description
    }
    createLab(lab).then(r => this.loadLabs())
  }

  renderModals () {
    if (!this.state.owner) return
    return (
      <div>
        <EditModal
          id='contact-edit'
          title='Edit Contact Info'
          modalAction={this.sendContactInfo.bind(this)}
        >
          <EditContact
            modalEdit
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
        <EditModal
          id='link-edit'
          title='Edit Links'
          modalAction={this.sendContactInfo.bind(this)}
        >
          <EditLinks
            prof
            modalEdit
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
        <EditModal id='work-edit' title='Edit Work Info'>
          <EditExperience type='work' />
        </EditModal>
        <EditModal id='education-edit' title='Edit Education Info'>
          <EditExperience type='educ' />
        </EditModal>
        <EditModal id='bio-edit' title='Edit Bio'>
          <textarea placeholder='As a youngster on Tattooine, I always wanted to become a star-pilot ...' />
        </EditModal>
        <EditModal
          id='quickview-edit'
          title='Edit Quickview Info'
          modalAction={this.sendQuickviewInfo.bind(this)}
        >
          <EditQuickview
            img={this.state.image}
            modalEdit
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
        <EditModal
          id='create-lab-modal'
          title='Create A Lab'
          modalAction={r => this.handleLabCreation()}
        >
          <div className='input-field'>
            <input
              id='lab-create-name'
              value={this.state.lab_create_name}
              type='text'
              placeholder='Smooth Jazz Lab'
              onChange={e => this.setState({ new_lab_name: e.target.value })}
            />
            <label htmlFor='name' className='active'>
              Lab Name
            </label>
          </div>
          <div className='input-field'>
            <input
              id='lab-create-email'
              value={this.state.lab_create_email}
              type='email'
              placeholder='lab@labemail.com'
              onChange={e => this.setState({ new_lab_email: e.target.value })}
            />
            <label htmlFor='email' className='active'>
              Email
            </label>
          </div>
          <div className='input-field'>
            <input
              id='lab-create-phone'
              value={this.state.lab_create_phone}
              type='text'
              placeholder='123-456-7890'
              onChange={e => this.setState({ new_lab_phone: e.target.value })}
            />
            <label htmlFor='phone' className='active'>
              Phone
            </label>
          </div>
          <div className='input-field'>
            <textarea
              id='lab-create-description'
              value={this.state.lab_create_description}
              placeholder='we do cool stuff'
              onChange={e =>
                this.setState({ new_lab_description: e.target.value })
              }
            />
          </div>
          <br />
          <br />
        </EditModal>
        <EditModal
          id={`create-lab`}
          wide
          actionName='create'
          title={`Create New Lab`}
          modalAction={() => this.getModalAction(true)}
        >
          <CreateLab />
        </EditModal>
        <EditModal
          id='delete-lab'
          title={`Delete ${this.state.selected_lab.name}`}
          actionName='Delete Lab'
          slim
          modalAction={() => this.getModalAction(false)}
        >
          <p>
            Are you sure you want to delete the lab{' '}
            {this.state.selected_lab.name}? This action cannot be undone.
          </p>
        </EditModal>
      </div>
    )
  }

  render () {
    if (!isLoggedIn()) {
      return <ErrorPage />
    } else if (this.state.no_lab) {
      return <ErrorPage fourofour='true' />
    } else {
      let {
        owner,
        contact_email,
        contact_phone,
        name,
        loading_labs,
        labs,
        image
      } = this.state

      return (
        <div id='user-content-body'>
          {this.renderModals()}
          <SideBar email={contact_email} phone={contact_phone} owner={owner} />
          <Dashboard
            name={name}
            loading_labs={loading_labs}
            labs={labs}
            img={image}
            owner={owner}
          />
        </div>
      )
    }
  }
}

function Dashboard ({ name, loading_labs, labs, img, owner }) {
  return (
    <div id='user-column-Dashboard'>
      <Quickview name={name} img={img} owner={owner} />
      <Labs loading={loading_labs} labs={labs} owner={owner} />
      <WorkExperience owner={owner} />
    </div>
  )
}

function WorkExperience ({ owner }) {
  return (
    <div>
      <h1>Work Experience</h1>
      <UserWorkExperience
        title='Manhattan Project'
        description='Did some pretty cool stuff, including but not limited to: sleeping in the acetone bath, juggling vials, playing russian hydrochloric acid roulette, spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room. spontaneous macarena, salsa making in the vacuum room.'
        startTime='August 2017'
        endTime='Present'
      />
      {owner && (
        <Editor permissions superClick={() => openModal(`work-edit`)} />
      )}
    </div>
  )
}

function Labs ({ loading, labs, owner }) {
  return (
    <div id='user-labs'>
      <h1>Labs</h1>
      <div>
        {loading ? (
          <i className='loading-pad'>Loading Labs ...</i>
        ) : (
          labs.map(labAssoc => {
            let { id, name, description } = labAssoc.lab
            return (
              <div>
                <a key={id} href={`/prof-page/${id}`}>
                  {name || `No Name, id:${id}`}
                </a>
                <span>{description}</span>
              </div>
            )
          })
        )}
      </div>
      {owner && (
        <Editor
          permissions
          superClick={() => openModal('create-lab-modal')}
          add
        />
      )}
    </div>
  )
}

function Quickview ({ name, img, owner }) {
  return (
    <div id='user-quickview'>
      <div id='user-quickview-img-container'>
        <img id='user-quickview-img' src={img} />
      </div>
      <div id='user-quickview-name'>{name}</div>
      {owner && (
        <Editor permissions superClick={() => openModal(`quickview-edit`)} />
      )}
    </div>
  )
}

function SideBar ({ email, phone, owner }) {
  return (
    <div id='user-column-L'>
      <div className='join-lab' onClick={r => openModal('create-lab-modal')}>
        <div>Create A Lab</div>
      </div>
      <div>
        <h1>Quick Info</h1>
        <div>Extraordinary Alchemist</div>
      </div>
      <div>
        <h1>Contact Info</h1>
        <div>
          <div id='user-email'>
            <b>Email</b> <a href={`mailto:${'bearb@umich.edu'}`}>{email}</a>
          </div>
          <div>
            <b>Phone</b> {phone}
          </div>
        </div>
        {owner && (
          <Editor permissions superClick={() => openModal('contact-edit')} />
        )}
      </div>
    </div>
  )
}

class UserWorkExperience extends Component {
  expand () {
    document
      .getElementById(`user-work-description-${this.props.title}`)
      .classList.toggle('expand')
  }

  render () {
    return (
      <div
        id={`user-work-${this.props.title}`}
        className='user-work-experience'
      >
        <div className='user-work-title'>{this.props.title}</div>
        <div className='user-work-time'>
          {`${this.props.startTime} - ${this.props.endTime}`}
        </div>
        <div
          id={`user-work-description-${this.props.title}`}
          className='user-work-description'
        >
          {this.props.description}
        </div>
        <ExpanderIcons
          id={`user-work-${this.props.title}`}
          action={this.expand.bind(this)}
        />
      </div>
    )
  }
}

export default ProfPage
