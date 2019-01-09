import React from 'react'
import ResetEmailModal from '../../../utilities/modals/ResetEmailModal';
import ResetPasswordModal from '../../../utilities/modals/ResetPasswordModal';
import DeleteUserModal from '../../../utilities/modals/DeleteUserModal';
import Floater from '../../../../1-layouts/Floater'
import {SubmitInput} from '../../../../3-utils/Inputs'

export default function(props) {
  return (
    <div className='shift-down'>
				<ResetEmailModal callbackEmail={props.resetEmail} />
				<ResetPasswordModal email={props.email}/>
				<DeleteUserModal />
				{/* <div id="modalBackdrop"></div> */}
				<Floater>
          <div className='settings shadow'>
            <h1>Settings</h1>
            <SubmitInput onClick={props.openEmailModal}>reset email</SubmitInput>
            <SubmitInput onClick={props.openPasswordModal}>reset password</SubmitInput>
            <SubmitInput onClick={props.openDeleteModal}>delete account</SubmitInput>
          </div>
        </Floater>

				{/* <div className='lab-text-info shift-down'>
					<div className='container center-align lab-text-info-form shadow'>
						<div className='lab-text-info-header'>Settings</div>
						<div className='row'>
							<div className='container col m4 s4 l4 setting-col'>
								<i className="material-icons setting-icon">mail outline</i>
								<BasicButton icon='mail outline' superClick={this.openEmailModal} msg='reset email'/>
							</div>
							<div className='container col m4 s4 l4 setting-col'>
								<i className="material-icons setting-icon">lock outline</i>
								<BasicButton icon='lock outline' superClick={this.openPasswordModal} msg='reset password'/>
							</div>
							<div className='container col m4 s4 l4 setting-col'>
								<i className="material-icons setting-icon">remove circle</i>
								<BasicButton icon='remove circle' superClick={this.openDeleteModal} msg='delete account'/>
							</div>
						</div>
						<div className='container user-information'>
							<b>Current User Information</b> <br/>
							{this.state.loading ?
								<DotLoader />
								:
								<div>
									Name: {this.state.name} <br/>
									Email: {this.state.email} <br/>
									User Type: {this.state.user_type} <br/>
								</div>
							}
						</div>
					</div>
				</div> */}
			</div>
  )
}