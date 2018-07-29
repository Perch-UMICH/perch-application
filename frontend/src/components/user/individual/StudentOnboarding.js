import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import $ from 'jquery'
import './StudentEditors.css'
import {EditContact} from './StudentEditors'
import ProgressIndicator from '../../utilities/ProgressIndicator'
import EnterContact from './EnterContact'
import EnterBio from './EnterBio'
import PickYourInterests from './PickYourInterests'
import NotableClasses from './NotableClasses'
import UploadImage from '../maintenance/UploadImage'
import Experience from './Experience'
import Education from './Education'
import Links from './Links'
import {getStudent, isLoggedIn, isStudent, getCurrentStudentId, getCurrentUserId, verifyLogin, getStudentFromUser, getStudentTags, getStudentSkills, getUser, updateStudent} from '../../../helper.js'
import './StudentOnboarding.css'

class StudentOnboarding extends Component {
  constructor(props) {
    super(props)
    this.sendUpdate = this.sendUpdate.bind(this);
    this.state = {
      curStep: 0,
      numSteps: 8,
      user: {},
      steps: {},
    }
  }

  componentDidMount() {
    console.log("MOUNTED");
    getStudentFromUser(getCurrentUserId()).then(r => console.log("RESPPP!!!", r));
    var steps = {
      0: <EnterContact user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
      1: <PickYourInterests user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
      2: "",
      3: <EnterBio user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
      4: <UploadImage user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
      5: <Experience user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
      6: <Education user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
      7: <Links user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
    }
    this.setState({steps})
  }

  sendUpdate(redirect) {
    var user = this.state.user;
    var nameArr = user && user.name ? user.name.split(' ') : [];
    var first_name = nameArr[0] ? nameArr[0]: "";
    var last_name = nameArr[1] ? nameArr[1] : "";
    var s = {
      email: user.email ? user.email : null,
      year: user.year ? user.year : null,
      bio: user.bio ? user.bio : null,
      major: user.major ? user.major : null,
      gpa: user.gpa ? user.gpa : null,
      experiences: user.experiences ? user.experiences : null,
      classes: user.classes ? user.classes : null,
      linkedin_link: user.linkedin_link ? user.linkedin_link : null,
      website_link: user.website_link ? user.website_link : null,
    }
    updateStudent(first_name, last_name, s.email, s.year, s.bio, s.major, s.gpa, s.classes, s.experiences, s.linkedin_link, s.website_link).then(r => console.log("blahhhh", r));
    if (redirect) {
      window.location = '/student-profile/' + getCurrentUserId();
    }
  }

  updateUser(field, newValue) {
    console.log("updating ", field, " to ", newValue);
    var newState = this.state;
    newState.user[field] = newValue;
    this.setState(newState);
  }

	render() {
    var backBtn = <BasicButton msg='back' superClick={() => {this.setState({curStep: this.state.curStep - 1}); this.sendUpdate()}}/>;
    var nextBtn = <BasicButton msg='next' superClick={() => {this.setState({curStep: this.state.curStep + 1}); this.sendUpdate()}}/>;
    var stepToRender = this.state.steps[this.state.curStep];
    if (this.state.curStep === 0) {
      backBtn = null;
    }
    else if (this.state.curStep === (this.state.numSteps - 1)) {
      nextBtn = <BasicButton msg='go to profile' superClick={() => this.sendUpdate(true)}/>
    }
    var css = "invisible";
    if (this.state.curStep === 2) {
      css = "visible-yes";
      nextBtn = <BasicButton msg='next' superClick={() => {this.setState({curStep: this.state.curStep + 1}); this.sendUpdate()}}/>;
    }
    var dropDown = <div className={css}>
      <NotableClasses user={this.state.user} showForm={true} updateUser={this.updateUser.bind(this)}/>
    </div>
		return (
      <div className="onboarding-container">
        {backBtn}
        {nextBtn}
        <ProgressIndicator steps={this.state.numSteps} curStep={this.state.curStep} />
        {dropDown}
        {stepToRender}
      </div>
		)
	}
}

export default StudentOnboarding;
