import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import {EditContainer} from '../individual/StudentEditors'
import '../individual/StudentEditors.css';

export class EditContactTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: 'rodriegez@perch.edu',
            phone: '643-867-5309',
            location: '42 Wallaby Way, Sydney',
        }
    }
    render() {
        return(
            <form id='edit-contact-tab'>
                <div className='input-field'>
                    <input id='email' type='email' placeholder='bearb@umich.edu' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                    <label htmlFor='email'>Email</label>
                </div>
                <div className='input-field'>
                    <input type='text' id='phone-number' placeholder='815-262-4141' value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
                    <label htmlFor='phone-number'>Phone</label>
                </div>
                <div className='input-field'>
                    <input type='text' id='location' placeholder='1800 Chemistry' value={this.state.location} onChange={(e) => this.setState({location: e.target.value})}/>
                    <label htmlFor='location'>Location</label>
                </div>
            </form>
        )
    }
}

export const Test = () => (
        <EditContainer title='Contact Info'><EditContactTab /></EditContainer>
    )