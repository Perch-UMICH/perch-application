import React, {Component} from 'react';
import ErrorPage from '../../utilities/ErrorPage'
import EditModal from '../../utilities/modals/EditModal'
import GroupQuickview from './GroupQuickview'
import CreatePosition from './CreatePosition'
import ExpanderIcons from '../../utilities/ExpanderIcons'
import {GroupPublicationsContainer, GroupPublication} from './GroupPublications'
import {GroupProject, GroupProjectContainer} from './GroupProject'
import {EditAdmins} from './GroupEditors'
import BasicButton from '../../utilities/buttons/BasicButton'
import {permissionCheck, removeMembersFromLab, getLab, isLoggedIn, getCurrentUserId, getUser, getFacultyFromUser, getAllLabPositions,
        getLabPreferences, isStudent, isLab, getLabMembers, createApplication, addMembersToLab} from '../../../helper.js'
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
            new_pos: {},
            members_raw: [],
            admins_raw: [],
        }
    }

    componentWillMount() {
      getAllLabPositions(this.state.lab_id).then((resp) => {
          let positions = [];
          console.log(resp);
          resp.data.map((pos, index) => {
              positions.push(<GroupProject key={`${index}-p`} title={pos.title} spots={pos.open_slots} keywords='MISSING' description={pos.description}
                              time_commit={pos.min_time_commitment} gpa='MISSING' year='MISSING' urop={pos.is_urop_project}/>);
          })
          this.setState({lab_positions: positions});
      });

      getLab(this.state.lab_id).then((resp) => {
          console.log(resp);
          this.setState({lab_data: resp.data.data});
      });

      getLabMembers(this.state.lab_id).then((resp) => {
          let admins = [];
          let members = [];
          let admins_raw = [];
          let members_raw = [];
          console.log(resp);
          resp.data.faculty.map((person) => {
              let fullname = person.data.first_name + ' ' + person.data.last_name;
              if ((person.role === 1) || (person.role === 2)) {
                  admins.push(<GroupPerson src={person.data.profilepic_path || '/img/akira.jpg'}>{fullname}</GroupPerson>);
                  admins_raw.push([fullname, person.data.user_id]);
              }
              else {
                  members.push(<GroupPerson src={person.data.profilepic_path || '/img/akira.jpg'}>{fullname}</GroupPerson>);
                  members_raw.push([fullname, person.data.user_id]);
              }
          })
          resp.data.students.map((person) => {
              let fullname = person.data.first_name + ' ' + person.data.last_name;
              if ((person.role === 1) || (person.role === 2)) {
                  admins.push(<GroupPerson src={person.data.profilepic_path || '/img/akira.jpg'}>{fullname}</GroupPerson>);
                  admins_raw.push([fullname, person.data.user_id]);
              }
              else {
                  members.push(<GroupPerson src={person.data.profilepic_path || '/img/akira.jpg'}>{fullname}</GroupPerson>);
                  members_raw.push([fullname, person.data.user_id]);
              }
          })
          this.setState({lab_admins: admins, lab_members: members, admins_raw: admins_raw, members_raw: members_raw});
      });

  }

  // Update the new position from modal, to be submitted by createPosition
  updateNewPosState(name, value) {
    let newState = this.state;
    newState.new_pos[name] = value;
    this.setState(newState);
    console.log("UPDATE", name, "TO", value)
  }

  // create position and position application, call from create position modal
  createPosition() {
    let new_pos = this.state.new_pos;
    alert(`attempting position create ${new_pos.title} ${new_pos.description} ${new_pos.time_commitment} ${new_pos.open_slots}`);
    // createLabPosition(new_pos.title, new_pos.description, new_pos.time_commitment, new_pos.open_slots).then(resp => {
    //   // hopefully get position_id from resp
    //   // createApplication({pos_id, new_pos.questions})
    // });
  }

  openModal(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).classList.add('activated');
      document.getElementById(`${id}-backdrop`).classList.add('activated');
    }
  }

  handleEditMembers() {
    let id = document.getElementById('new-member').value
    addMembersToLab(145, [id], [3]).then(r=>console.log(r))
  }

	render() {
		return(
			<div id='group-page'>
        <EditModal id={`${this.state.lab_id}-create-position`} wide={true} actionName="create"
          title={`Create New Project`} modalAction={this.createPosition.bind(this)}>
          <CreatePosition updateNewPosState={this.updateNewPosState.bind(this)} />
        </EditModal>

        <EditModal id='edit-admins' wide={true}
          title='Edit Admins'>
          <div className='row'>
            <h5 className='col s12'>Modify Admins</h5>
            {this.state.admins_raw.map(e => <AdminView name={e[0]} id={e[1]}/>)}
          </div>
        </EditModal>

        <EditModal id='edit-members' wide={true}
          title='Edit Members'>
          <div className='row'>
            <h5>Add a new member</h5>
            <div className='input-field col s10'>
              <input id='new-member' type='number' placeholder='#' />
              <label htmlFor='email' className="active">User ID</label>
            </div>
            <div className='col s2'>
              <BasicButton msg='add member' superClick={this.handleEditMembers.bind(this)} />
            </div>
          </div>
          <div className='row'>
            <h5 className='col s12'>Modify Users</h5>
            {this.state.members_raw.map(e => <MemberView name={e[0]} id={e[1]}/>)}
          </div>
        </EditModal>


				<div id='group-page-column-L'>
					<Administrators people={this.state.lab_admins}/>
					<Members people={this.state.lab_members}/>
				</div>
				<div id='group-page-column-R'>
            <QuickInfo department='MISSING'/>
            <ContactInfo email='MISSING' phone='MISSING' location='MISSING'/>
        </div>
				<div id='group-page-main'>
					<GroupQuickview title={this.state.lab_data.name} description='NULL'/>

					<GroupProjectContainer addFunction={() => this.openModal(`${this.state.lab_id}-create-position`)}>
						{this.state.lab_positions}
					</GroupProjectContainer>

					<GroupPublicationsContainer>
						<GroupPublication title='NULL' description="MISSING"/>
					</GroupPublicationsContainer>
				</div>
			</div>
		)
	}
}

// Our Admin Panel on Group Page. Uses GroupPerson components
const Administrators = (props) => {
	return(
		<div id='group-admins'>
			<h1>Admins</h1>
			<div className='group-photos'>
				{props.people}
			</div>
      <Editor superClick={() => openModal('edit-admins')}/>
		</div>
	)
}

const Members = (props) => {
	return(
		<div id='group-members'>
			<h1>Members</h1>
			<div className='group-photos'>
				{props.people}
			</div>
      <Editor superClick={() => openModal('edit-members')}/>
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
			<div className='group-person-overlay'>
				<span>{props.children}</span>
			</div>
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
                <div className='group-info-box-heading'>RESEARCH AREAS</div>
                <div className='group-info-box-content'>MISSING</div>
            </div>
        </div>
    )
}

const ContactInfo = (props) => {
    return(
        <div id='group-contact-info'>
            <h1>Contact Info</h1>
            <div className='group-info-box'>
                <div className='group-info-box-content'><b>Email</b> <a href={`mailto:${props.email}`}>{props.email}</a></div>
                <div className='group-info-box-content'><b>Phone</b> {props.phone} </div>
                <div className='group-info-box-content'><b>Office</b> {props.location}</div>
            </div>
        </div>
    )
}

class AdminView extends Component {

  removeMember() {
    alert(this.props.id)
    removeMembersFromLab(145, [this.props.id]).then(r => this.setState())
  }

  removeAdmin() {
    removeMembersFromLab(145, [this.props.id])
      .then(r => addMembersToLab(145, [this.props.id], [3]))
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
    alert(this.props.id)
    removeMembersFromLab(145, [this.props.id]).then(r => this.setState())
  }

  makeAdmin() {
    removeMembersFromLab(145, [this.props.id])
      .then(r => addMembersToLab(145, [this.props.id], [2]))
  }

  render(props) {
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
