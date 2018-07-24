import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton';
import {EditContainer} from '../individual/StudentEditors';
import '../individual/StudentEditors.css';
import './GroupEditors.css';

export class EditAdmins extends Component {
    render() {
        return (
            <form>
                <div id='edit-admins'>
                    <div className='row'>
                        <div className='input-field col'>
                            <div className='edit-admins-label left-align'>Add Administrator</div>
                            <select className='dropdown' value=''>
                                <option value='' disabled>Select a member</option>
                                <option value='bearb'>Benji Bear</option>
                                <option value='emij'>Emi Jackson</option>
                                <option value='anishii'>Akira Nishii</option>
                            </select> 
                        </div>
                        <div className='col'>
                            <BasicButton msg='add admin' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='edit-admins-label left-align'>Current Administrators</div>
                            <div className='edit-admins-label left-align edit-admins-portraits-contianer'>TODO is an understatement</div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export const Test = () => (
    <EditContainer title='Administrators'><EditAdmins /></EditContainer>
)
