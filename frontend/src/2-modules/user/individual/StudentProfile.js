import React, { Component } from 'react'
import {
  getStudentFromUser,
  updateStudent,
  uploadUserProfilePic,
  getUserProfilePic,
  isLoggedIn,
  getCurrentUserId
} from '../../../helper.js'
import ErrorPage from '../../utilities/ErrorPage'
import ExpanderIcons from '../../utilities/ExpanderIcons'
import Editor from '../../utilities/Editor'
import EditModal from '../../utilities/modals/EditModal'
import {
  EditContact,
  EditExperience,
  EditQuickview,
  EditLinks,
  EditBio
} from './StudentEditors'
import PickYourInterests from './PickYourInterests'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import './StudentProfile.css'

// Handles opening of component editing modals
function openModal (id) {
  if (document.getElementById(id)) {
    document.getElementById(id).classList.add('activated')
    document.getElementById(`${id}-backdrop`).classList.add('activated')
  }
}

class StudentProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      bio: '',
      contact_email: '',
      contact_phone: '',
      classes: [],
      experience: [],
      skills: [],
      tags: [],
      work_experiences: [],
      crop: {
        x: 0.5,
        y: 0.5,
        scale: 1
      },
      owner: false,
      student: true,
      s_id: '',
      img: ''
    }
  }

  // Beginning point for data handling
  componentDidMount () {
    let id = window.location.pathname.split('/')[2]
    this.retrieveStudent(id)
    this.retrieveProfilePicture(id)
  }

  // set intitial student data and ownership
  retrieveStudent (id) {
    getStudentFromUser(id).then(({ data }) => {
      data.student = true
      data.name = data.first_name
      data.owner = data.user_id == getCurrentUserId()
      this.setState(data)
    })
  }

  // this just updates the state object, not the backend
  // used by modals to keep the state object up to date
  // eliminates the need to re-query the backend after updates
  updateUser (field, newValue) {
    this.state[field] = newValue
    this.setState(this.state)
  }

  /*******************/
  /* IMAGE FUNCTIONS */
  /*******************/

  // grab picture from backend
  retrieveProfilePicture (id) {
    getUserProfilePic(id)
      .catch(e => console.log('PIC ERROR', e))
      .then(r => {
        this.state.img = r.data.url || 'default image'
        this.setState(this.state)
      })
  }

  // backend needs a specially formatted object to send to backend for images
  // probably will be deprecated in the new node backend
  getImageData (user) {
    // default crop
    if (!user.crop) {
      user.crop = {
        x: 0.5,
        y: 0.5,
        scale: 1
      }
    }
    let formData = new FormData()
    formData.append('file', user.img)
    let to_return = {
      formData: formData,
      type: 'profile_pic',
      x: user.crop.x,
      y: user.crop.y,
      scale: user.crop.scale,
      user_id: getCurrentUserId()
    }
    return to_return
  }

  /*******************/
  /* MODAL FUNCTIONS */
  /*******************/

  // updates name and profile picture
  sendHeaderInfo () {
    var user = this.state
    updateStudent({ first_name: user.name })
    if (user.img) {
      uploadUserProfilePic(this.getImageData(user))
        .catch(e => console.log('profile pic bug'))
        .then(r => this.retrieveProfilePicture())
    }
  }

  // sends links to backend
  sendLinks () {
    let { linkedin_link, website_link } = this.state
    updateStudent({ linkedin_link, website_link })
  }

  // sends email and phone to backend
  sendContactInfo () {
    let { contact_email, contact_phone } = this.state
    updateStudent({ contact_email, contact_phone })
  }

  // sends bio to backend
  sendBio = () => {
    let { bio } = this.state
    updateStudent({ bio })
  }

  // sends work experiences to the backend
  // BROKEN, should keep track of work_experiences that are deleted rather than brute forcing
  // ask akshay for a sync function
  sendExperiences () {
    // let { work_experiences } = this.state
    // let idsToRemove = []
    // if (exists(work_experiences)) {
    //   idsToRemove = work_experiences.map(exp => exp.id)
    // }
    // removeWorkExperiencesFromStudent(idsToRemove).then(r => {
    //   let exps = this.state.work_experiences || []
    //   if (exps.length) {
    //     exps.map(exp =>
    //       addWorkExperienceToStudent(exp).then(r => this.generalHandler())
    //     )
    //   } else this.generalHandler()
    // })
  }

  renderModals () {
    return (
      <div>
        <EditModal
          id='skills-interests-edit'
          title='Edit Skills and Interests'
          noPadding
        >
          <PickYourInterests
            modalEdit
            editorOnly
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
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
          modalAction={this.sendLinks.bind(this)}
        >
          <EditLinks
            modalEdit
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
        <EditModal
          id='work-edit'
          title='Edit Work Info'
          modalAction={this.sendExperiences.bind(this)}
        >
          <EditExperience
            type='work'
            modalEdit
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
        <EditModal
          id='bio-edit'
          title='Edit Bio'
          modalAction={this.sendBio.bind(this)}
        >
          <EditBio
            modalEdit
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
        <EditModal
          id='quickview-edit'
          title='Edit Quickview Info'
          modalAction={this.sendHeaderInfo.bind(this)}
        >
          <EditQuickview
            modalEdit
            img={this.state.img}
            user={this.state}
            updateUser={this.updateUser.bind(this)}
          />
        </EditModal>
      </div>
    )
  }

  render () {
    let user = this.state
    if (!isLoggedIn()) return <ErrorPage />
    else {
      return (
        <div id='user-content-body'>
          {this.renderModals()}
          <LeftPanel user={user} />
          <MainPanel user={user} />
          <RightPanel />
        </div>
      )
    }
  }
}

function MainPanel ({ user }) {
  return (
    <div id='user-profile-column-C'>
      <div id='user-quickview'>
        <div id='user-quickview-img-container'>
          <img id='user-quickview-img' src={user.img || '/img/rodriguez.jpg'} />
        </div>
        <div style={{ position: 'relative' }}>
          <div id='user-quickview-name'>{user.name}</div>
        </div>
        <SkillsInterests
          owner={user.owner}
          skills={user.skills}
          interests={user.tags}
        />
        <Editor
          permissions={user.owner}
          superClick={() => openModal('quickview-edit')}
        />
        <div style={{ position: 'relative' }}>
          <UserBio>{user.bio}</UserBio>
          <Editor
            permissions={user.owner}
            superClick={() => openModal('bio-edit')}
          />
        </div>
      </div>
      <div>
        <h1>Experience</h1>
        <UserWorkExperience expObjs={user.work_experiences} />
        <Editor
          permissions={user.owner}
          superClick={() => openModal('work-edit')}
        />
      </div>
    </div>
  )
}

function LeftPanel ({ user }) {
  return (
    <div id='user-column-L'>
      <ContactTab user={user} />
      <LinkTab user={user} />
    </div>
  )
}

function RightPanel () {
  return (
    <div id='user-column-R'>
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName='UMichResearch'
        options={{ height: 'calc(100vh - 200px)' }}
      />
    </div>
  )
}

function LinkTab ({ user }) {
  return (
    <div id='user-links'>
      <h1>Links</h1>
      <div>
        <a
          target='_blank'
          href={user.linkedin_link}
          style={{ textAlign: 'left', textDecoration: 'underline' }}
        >
          LinkedIn
        </a>
      </div>
      <Editor
        permissions={user.owner}
        superClick={() => openModal('link-edit')}
      />
    </div>
  )
}

function ContactTab ({ user }) {
  return (
    <div>
      <h1>Contact</h1>
      <div>
        <div id='user-email'>
          <b>Email </b>
          <a href={`mailto:${user.contact_email}`}>{user.contact_email}</a>
        </div>
        <div id='user-phone'>
          <b>Phone</b> {user.contact_phone}
        </div>
      </div>
      <Editor
        permissions={user.owner}
        superClick={() => openModal('contact-edit')}
      />
    </div>
  )
}

class UserWorkExperience extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showExpander: false,
      description: ''
    }
  }

  componentDidMount () {
    if (this.state.description.length >= 250) {
      this.setState({ showExpander: true })
    }
  }

  expand () {
    document
      .getElementById(`user-work-description-${this.props.title}`)
      .classList.toggle('expand')
  }

  render () {
    var expObjs = this.props.expObjs ? this.props.expObjs : []

    let experiences = expObjs.map((expObj, index) => {
      return (
        <div
          key={`user-work-${index}`}
          id={`user-work-${expObj.title}`}
          className='user-work-experience'
        >
          <div className='user-work-title'>{expObj.title}</div>
          <div className='user-work-time'>
            {`${expObj.start_date} - ${expObj.end_date}`}
          </div>
          <div
            id={`user-work-description-${expObj.title}`}
            className='user-work-description'
          >
            {expObj.description}
          </div>
          {this.state.showExpander && (
            <ExpanderIcons
              id={`user-work-${'title'}`}
              action={this.expand.bind(this)}
            />
          )}
        </div>
      )
    })

    return (
      <div className='user-work-experience-container'>
        {experiences}
        {!experiences.length && (
          <div style={{ padding: '10px 20px', color: 'lightgrey' }}>
            Freelance netflix reviewer
          </div>
        )}
      </div>
    )
  }
}

class UserBio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showExpander: false
    }
  }

  componentWillReceiveProps () {
    // if (this.props.children.length >= 20)
    this.setState({ showExpander: true })
  }

  expand () {
    document.getElementById('user-bio-content').classList.toggle('expand')
  }

  render () {
    return (
      <div id='user-bio' className='user-bio'>
        <div id='user-bio-content' className='user-bio-content'>
          {!this.props.children.length && (
            <div style={{ color: 'lightgrey' }}>
              Superstar, worldwide phenomenon
            </div>
          )}
          {this.props.children}
        </div>
        {this.state.showExpander && (
          <ExpanderIcons id={`user-bio`} action={this.expand.bind(this)} />
        )}
      </div>
    )
  }
}

function SkillsInterests ({ owner, interests, skills }) {
  return (
    <div id='user-skills-interests'>
      <Editor
        permissions={owner}
        superClick={() => openModal('skills-interests-edit')}
      />
      {!interests.length && !skills.length && (
        <div style={{ color: 'lightgrey', paddingTop: '10px' }}>
          Big nickelback fan
        </div>
      )}
      {interests.map((item, index) => (
        <Bubble key={`${index}-int`} type='interest'>
          {item.name}
        </Bubble>
      ))}

      {skills.map((item, index) => (
        <Bubble key={`${index}-skill`} type='skill'>
          {item.name}
        </Bubble>
      ))}
    </div>
  )
}

class Bubble extends Component {
  render () {
    return (
      <span className='bubble-container'>
        <div className={this.props.type == 'skill' ? 'skill' : 'interest'}>
          {this.props.children}
        </div>
      </span>
    )
  }
}

export default StudentProfile
