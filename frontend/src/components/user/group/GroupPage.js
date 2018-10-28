import React, {Component} from 'react';
import EditModal from '../../utilities/modals/EditModal'
import GroupQuickview from './GroupQuickview'
import CreatePosition from './CreatePosition'
import {GroupPublicationsContainer, GroupPublication} from './GroupPublications'
import {modalUpdateLab} from '../CreateLab'
import {GroupProject, GroupProjectContainer} from './GroupProject'
import BasicButton from '../../utilities/buttons/BasicButton'
import {getStudentFromUser, deleteLab, permissionCheck, removeMembersFromLab, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions, createLabPosition,
    isStudent, isLab, getLabMembers, createLabPositionApplication, addMembersToLab, getCurrentLabId} from '../../../helper.js'
import Editor from '../../utilities/Editor'
// import $ from 'jquery'
// import M from 'materialize-css'

import './GroupPage.css'

function openModal(id) {
  if (document.getElementById(id)) {
    document.getElementById(id).classList.add('activated');
    document.getElementById(`${id}-backdrop`).classList.add('activated');
  }
}

// Our Group Page master componenet
class GroupPage extends Component {
    constructor(props) {
        super(props);

        var labID = window.location.pathname.split('/')[2];
        this.state = {
            lab_id: labID,
            lab_positions: [],
            lab_data: {},
            lab_admins: [],
            lab_members: [],
            new_pos: { min_time_commitment: 10 },
            updated_lab: {},
            members_raw: [],
            admins_raw: [],
            app_questions: [],
            user_saved_labs: [],
        }
    }

    // Refresh page to display initial & updated lab members
    loadLabMembers() {
      getLabMembers(this.state.lab_id).then((resp) => {
          let admins = [],
            members = [],
            admins_raw = [],
            members_raw = [];

          resp.data.faculty.map((person) => {
              let fullname = person.data.first_name + ' ' + person.data.last_name;
              if ((person.role === 1) || (person.role === 2)) {
                  admins.push(<GroupPerson key={person.data.user_id} link={`/prof/${person.data.id}`} src={person.data.profilepic_path || 'https://catking.in/wp-content/uploads/2017/02/default-profile-1.png'}>{fullname}</GroupPerson>);
                  admins_raw.push([fullname, person.data.user_id]);
              }
              else {
                  members.push(<GroupPerson key={person.data.user_id} link={`/prof/${person.data.id}`} src={person.data.profilepic_path || 'https://catking.in/wp-content/uploads/2017/02/default-profile-1.png'}>{fullname}</GroupPerson>);
                  members_raw.push([fullname, person.data.user_id]);
              }
          })

          resp.data.students.map((person) => {
              console.log("PERSON", person)
              let fullname = person.data.first_name + ' ' + person.data.last_name;
              if ((person.role === 1) || (person.role === 2)) {
                  admins.push(<GroupPerson key={person.data.user_id} link={`/student-profile/${person.data.id}`} src={person.data.profilepic_path || 'https://catking.in/wp-content/uploads/2017/02/default-profile-1.png'}>{fullname}</GroupPerson>);
                  admins_raw.push([fullname, person.data.user_id]);
              }
              else {
                  members.push(<GroupPerson key={person.data.user_id} link={`/student-profile/${person.data.id}`} src={person.data.profilepic_path || 'https://catking.in/wp-content/uploads/2017/02/default-profile-1.png'}>{fullname}</GroupPerson>);
                  members_raw.push([fullname, person.data.user_id]);
              }
          })

          let priveleges = this.hasPermissions(admins_raw)

          this.setState({lab_admins: admins, lab_members: members, admins_raw: admins_raw, members_raw: members_raw, admin_access: priveleges});
      })
    }

    loadLabPositions() {
      getAllLabPositions(this.state.lab_id).then((resp) => {
          let positions = resp.data || [];
          this.setState({lab_positions: positions});
      });
    }

    componentDidMount() {
      this.loadLabPositions();
      getLab(this.state.lab_id)
        .then((resp) => {
            this.setState({lab_data: resp.data.data, updated_lab: resp.data.data});
        })

      if (isStudent()) {
        getStudentFromUser(getCurrentUserId())
        .then((r) => {
          this.setState({user_saved_labs: r.data.position_list})
        })
      }

      this.loadLabMembers();
  }

  // Update the new position from modal, to be submitted by createPosition
  updateNewPosState(name, value) {
    let newState = this.state;
    newState.new_pos[name] = value;
    this.setState(newState);
  }

  // Update the revisionist lab from modal, to be submitted by createPosition
  updateLabState(e) {
		let updated_lab = this.state.updated_lab;
		updated_lab[e.target.name] = e.target.value;
		this.setState({updated_lab});
	}

  // create position and position application, call from create position modal
  createPosition() {
    let new_pos = this.state.new_pos;
    alert(`attempting position create ${new_pos.title} ${new_pos.description} ${new_pos.time_commitment} ${new_pos.open_slots}`);
    createLabPosition(this.state.lab_id, new_pos).then(resp => {
    //   // hopefully get position_id from resp
        let questions = []
        if (this.state.app_questions) 
          this.state.app_questions.map(q => questions.push(q.text))
        let application = {
          position_id: resp.data.id,
          questions,
        }
        createLabPositionApplication(this.state.lab_id, application)
        this.loadLabPositions();
        this.setState({new_pos: { min_time_commitment: 10 }})
    });
  }

  openModal(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).classList.add('activated');
      document.getElementById(`${id}-backdrop`).classList.add('activated');
    }
  }

  handleEditMembers() {
    let id = document.getElementById('new-member').value
    // check if user is not already the lab admin.
    addMembersToLab(this.state.lab_id, [id], [3]).then(r=> {
      this.loadLabMembers();
    })
  }

  hasPermissions(admins) {
    let user_id = getCurrentUserId()
    for (let i = 0; i < admins.length; i++)
      if (admins[i][1] == user_id)
        return true
    return false
  }

  renderModals() {
    return (
      <div>
        <EditModal id={`${this.state.lab_id}-create-position`} wide={true} actionName="create" title={`Create New Project`} modalAction={this.createPosition.bind(this)}>
          <CreatePosition updateNewPosState={this.updateNewPosState.bind(this)} new_pos={this.state.new_pos} updateAppQuestions={(app_questions) => this.setState({app_questions})} />
        </EditModal>

        <EditModal id={`edit-name`} wide={true} actionName="update" medium={true} title={`Update Name & Description`} modalAction={() => modalUpdateLab(this.state.updated_lab, () => getLab(this.state.lab_id))}>
          <b>New Name</b>
          <input type='text' name='name' value={this.state.updated_lab.name} onChange={(e) => this.updateLabState(e)}/>
          <b>New Description</b>
          <input type='text' name='description' value={this.state.updated_lab.description} onChange={(e) => this.updateLabState(e)}/>
        </EditModal>

        <EditModal id={`edit-contact`} wide={true} actionName="update" medium={true}
          title={`Update Contact Info`} modalAction={() => modalUpdateLab(this.state.updated_lab, () => getLab(this.state.lab_id))}>
          <b>New Email</b>
          <input type='text' name='contact_email' value={this.state.updated_lab.contact_email} onChange={(e) => this.updateLabState(e)}/>
          <b>New Phone</b>
          <input type='text' name='contact_phone' value={this.state.updated_lab.contact_phone} onChange={(e) => this.updateLabState(e)}/>
          <b>New Office Location</b>
          <input type='text' name='location' value={this.state.updated_lab.location} onChange={(e) => this.updateLabState(e)}/>
        </EditModal>

        <EditModal id='edit-admins' wide={true}
          title='Edit Admins'>
          <div className='row'>
            <h5 className='col s12'>Modify Admins</h5>
            {this.state.admins_raw.map(e => <AdminView key={e[1]} reloadMembersAndAdmin={this.loadLabMembers.bind(this)}
              lab_id={this.state.lab_id} name={e[0]} id={e[1]}/>)}
          </div>
          <div className='row'>
            <h5 className='col s12'>Delete Page</h5>
            <BasicButton msg='delete page' superClick={r => deleteLab(this.state.lab_id)}/>
          </div>
        </EditModal>

        <EditModal id='edit-members' wide={true}
          title='Edit Members'>
          <div className='row'>
            <h5>Add a new member</h5>
            <div className='input-field col s10'>
              <input id='new-member' type='number' placeholder='#'/>
              <label htmlFor='email' className="active">User ID</label>
            </div>
            <div className='col s2'>
              <BasicButton msg='add member' superClick={this.handleEditMembers.bind(this)} />
            </div>
          </div>
          <div className='row'>
            <h5 className='col s12'>Modify Users</h5>
            {this.state.members_raw.map(e => <MemberView reloadMembersAndAdmin={this.loadLabMembers.bind(this)}
              lab_id={this.state.lab_id} name={e[0]} id={e[1]}/>)}
          </div>
        </EditModal>

      </div>
    )
  }

	render() {
    let lab_positions = this.state.lab_positions
		return(
			<div id='group-page'>
        {this.renderModals()}

				<div id='group-page-column-L'>

					<Administrators admin_access={this.state.admin_access} people={this.state.lab_admins}/>

					<Members admin_access={this.state.admin_access} people={this.state.lab_members}/>

          <QuickInfo department='MISSING'/>

          <ContactInfo email={this.state.lab_data.contact_email} phone={this.state.lab_data.contact_phone} location={this.state.lab_data.location}/>
				
        </div>

				<div id='group-page-main'>

					<GroupQuickview title={this.state.lab_data.name} description={this.state.lab_data.description} superClick={() => this.openModal('edit-name')}/>
					
          <GroupProjectContainer addFunction={() => this.openModal(`${this.state.lab_id}-create-position`)}>
            {lab_positions.map((pos, index) => <GroupProject key={`${pos.id}-p`} saved_labs={this.state.user_saved_labs} lab_id={this.state.lab_id} pos_id={pos.id} cur_pos={pos} title={pos.title} spots={pos.open_slots} description={pos.description}time_commit={pos.min_time_commitment} admins={this.state.admins_raw} year='MISSING' urop={pos.is_urop_project} updatePositions={this.loadLabPositions.bind(this)}/>)}
					</GroupProjectContainer>

					<GroupPublicationsContainer>
						<GroupPublication title={this.state.lab_data.publications}/>
					</GroupPublicationsContainer>

				</div>
			</div>
		)
	}
}



















// Our Admin Panel on Group Page. Uses GroupPerson components
const Administrators = (props) => {
  let content = <div className='group-photos'>{props.people}</div>
  if (props.people.length == 0)
    content = <div className="group-default-text">No Current Admin</div>
	return(
		<div id='group-admins'>
			<h1>Admins</h1>
			{content}
      {props.admin_access && <Editor superClick={() => openModal('edit-admins')}/>}
		</div>
	)
}

const Members = (props) => {
  // If there are no lab members, set default message.
  let content = <div className='group-photos'>{props.people}</div>
  if (props.people.length == 0)
    content = <div className="group-default-text">No Current Members</div>
	return(
		<div id='group-members'>
			<h1>Members</h1>
			{content}
      {props.admin_access && <Editor superClick={() => openModal('edit-members')}/>}
		</div>
	)
}

// Used whenever we need a person img for Group Page
// Takes src for image
// Takes whatever is in its angle brackets for its name
const GroupPerson = (props) => {
	return(
		<div className='group-person'>
			<img src={props.src} />
			<a href={props.link}>
        <div className='group-person-overlay'>
  				<span>{props.children}</span>
  			</div>
      </a>
		</div>

	);
}

const QuickInfo = (props) => {
    return(
        <div id='group-quick-info'>
            <h1>Quick Info</h1>
            <div className='group-info-box'>
                <div className='group-info-box-heading'>UNIVERSITY</div>
                {/*TODO: Tie this to the backend*/}
                <div className='group-info-box-content'>University of Michigan</div>
                <div className='group-info-box-heading'>DEPARTMENTS</div>
                <div className='group-info-box-content'>{props.department}</div>
                {/*<div className='group-info-box-heading'>RESEARCH AREAS</div>
                <div className='group-info-box-content'>MISSING</div>*/}
            </div>
        </div>
    )
}

const ContactInfo = (props) => {
    return(
        <div id='group-contact-info'>
            <h1>Contact</h1>
            <div className='group-info-box'>
                <div className='group-info-box-content'><b>Email</b> <a href={`mailto:${props.email}`}>{props.email}</a></div>
                <div className='group-info-box-content'><b>Phone</b> {props.phone} </div>
                <div className='group-info-box-content'><b>Office</b> {props.location}</div>
            </div>
            {props.admin_access && <Editor superClick={() => openModal('edit-contact')}/>}
        </div>
    )
}

class AdminView extends Component {

  removeMember() {
    alert(this.props.id)
    removeMembersFromLab(this.props.lab_id, [this.props.id]).then(r => this.props.reloadMembersAndAdmin())
  }

  removeAdmin() {
    removeMembersFromLab(this.props.lab_id, [this.props.id])
      .then(r => addMembersToLab(this.props.lab_id, [this.props.id], [3])
      .then(r2 => this.props.reloadMembersAndAdmin()))
  }

  render(props) {
    return(
      <div id={this.props.name} className='member-view col s3'>
        <span>{this.props.name}</span>
        <div onClick={this.removeMember.bind(this)}>remove</div>
        <div onClick={this.removeAdmin.bind(this)}>remove admin priveleges</div>
      </div>
    )
  }
}

class MemberView extends Component {

  removeMember() {
    removeMembersFromLab(this.props.lab_id, [this.props.id]).then(r => this.props.reloadMembersAndAdmin())
  }

  makeAdmin() {
    removeMembersFromLab(this.props.lab_id, [this.props.id])
      .then(r => addMembersToLab(this.props.lab_id, [this.props.id], [2])
      .then(r2 => this.props.reloadMembersAndAdmin()))
  }

  render() {
    return(
      <div id={this.props.name} className='member-view col s3'>
        <span>{this.props.name}</span>
        <div onClick={this.removeMember.bind(this)}>remove</div>
        <div onClick={this.makeAdmin.bind(this)}>make admin</div>
      </div>
    )
  }
}

export default GroupPage;
