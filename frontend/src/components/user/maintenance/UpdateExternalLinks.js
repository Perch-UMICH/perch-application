import React, {Component} from 'react';
import {isStudent, isLab, getStudent, getCurrentStudentId, getCurrentUserId, getLab, getCurrentLabId, updateLab, updateStudent, getAllStudents} from '../../../helper.js'
import BasicButton from '../../utilities/buttons/BasicButton'
import './UpdateContact.css';

class UpdateExternalLinks extends Component {
    constructor(props) {
        super(props);
        this.state= {}
    }

    grabStudentInfo() { 
        getStudent(getCurrentStudentId()).then(resp => this.setState({
                                                                    linkedin: resp.data.linkedin_link,
                                                                    resume: resp.data.resume_path,
                                                                    website: resp.data.website_link
                                                                    }));
    }

    grabLabInfo() { 
        getLab(getCurrentLabId()).then(resp => this.setState({
            email: resp.data.contact_email,
            phone: resp.data.contact_phone,
            location: resp.data.location,
        }));
        getLab(getCurrentLabId()).then(resp => console.log(resp))
    }

    updateInfo(event) {
        event.preventDefault()
        if (isStudent()) 
            // NEED TO DO (NEED API)
            // updateStudent(getCurrentStudentId(), null, null, null, null, null, this.state.email, null, null, null, null).then(this.redirect.bind(this)) 
            this.redirect()
        else if (isLab()) 
            // NEED TO DO (NEED API)
            // updateLab(getCurrentLabId(), null, null, this.state.location, null, null, null, null, null, this.state.phone, this.state.email).then(this.redirect.bind(this))
            this.redirect()
    }

    componentDidMount() {
        if (isStudent()) 
            this.grabStudentInfo()
        
        else if (isLab()) {
            this.grabLabInfo();
            console.log(getCurrentUserId());
        }
    }

    redirect() {
        if (isStudent())
            window.location = `/student-profile/${getCurrentUserId()}`;
        else if (isLab())
            window.location = `/prof-page/${getCurrentLabId()}`;
    }

    render() {
        return (
            <div className="">
                <div className='lab-text-info shift-down' style={{width: '700px', margin: '50px auto'}}>
                    <form className='container center-align lab-text-info-form shadow' onSubmit={this.updateInfo.bind(this)}>
                        <div className='lab-text-info-header'>Update External Links</div>

                        {isStudent() &&
                        <div>
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input id='contact-email' className='gen-input' type='text' value={this.state.linkedin} onChange={(event) => this.setState({email: event.target.linkedin})} autofocus="autofocus"/>
                                    <label htmlFor="contact-email" >LinkedIn URL</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input id='contact-email' className='gen-input' type='text' value={this.state.resume} onChange={(event) => this.setState({email: event.target.resume})} autofocus="autofocus"/>
                                    <label htmlFor="contact-email" >Resume Link</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input id='contact-email' className='gen-input' type='text' value={this.state.website} onChange={(event) => this.setState({email: event.target.website})} autofocus="autofocus"/>
                                    <label htmlFor="contact-email" >Personal Website URL</label>
                                </div>
                            </div>
                        </div>}

                        {isLab() && 
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input id='contact-email' className='gen-input' type='text' value={this.state.website} onChange={(event) => this.setState({website: event.target.value})} autofocus="autofocus"/>
                                <label htmlFor="contact-email">Website</label>
                            </div>
                        </div>}
                        <BasicButton msg='save' color='light'/>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateExternalLinks;