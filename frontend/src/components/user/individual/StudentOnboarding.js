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
import {getStudent, isLoggedIn, isStudent, getCurrentStudentId, getCurrentUserId, verifyLogin, getStudentFromUser, getStudentTags, getStudentSkills, getUser, updateStudent, addSkillsToStudent, addTagsToStudent, addWorkExperiencesToStudent} from '../../../helper.js'
import './StudentOnboarding.css'

class StudentOnboarding extends Component {
  constructor(props) {
    super(props)
    this.sendUpdate = this.sendUpdate.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.updateExperience = this.updateExperience.bind(this);
    this.state = {
      curStep: 0,
      numSteps: 8,
      user: {},
    }
  }

  componentDidMount() {
    getStudentFromUser(getCurrentUserId()).then(r => {
      var user = r.data;
      var skills = [];
  		var interests = [];
  		getStudentSkills(getCurrentStudentId())
  		.then(skillsResp => {
  			if (skillsResp.data) {
  				skills = skillsResp.data
  			}
  			getStudentTags(getCurrentStudentId())
  			.then(tagsResp => {
  				if (tagsResp.data) {
  					interests = tagsResp.data
  				}
          user.skills = skills;
          user.interests = interests;
  				this.setState({user})
  				});
  		});
    });
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
      work_experiences: user.work_experiences ? user.work_experiences : null,
      classes: user.classes ? user.classes : null,
      linkedin: user.linkedin ? user.linkedin : null,
      website_link: user.website_link ? user.website_link : null,
    }
    updateStudent(first_name, last_name, s.email, s.year, s.bio, s.major, s.gpa, s.classes, s.work_experiences, s.linkedin, s.website_link).then(r => console.log("blahhhh", r));
    if (redirect) {
      window.location = '/student-profile/' + getCurrentUserId();
    }
  }

  updateTags() {
		var skillIds = [];
		var intIds = [];
    if (this.state.user.skills && this.state.user.skills.length) {
			this.state.user.skills.map(skill => {
				skillIds.push(skill.id);
			})
		}
		if (this.state.user.interests && this.state.user.interests.length) {
			this.state.user.interests.map(interest => {
				intIds.push(interest.id);
			})
		}
		addTagsToStudent(intIds).then(r => {
			addSkillsToStudent(skillIds).then(r => {
			});
		});
	}

	updateExperience() {
		addWorkExperiencesToStudent(this.state.user.work_experiences).then(r => {
		});
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
    var steps = {
      0: {
        comp: <EnterContact user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
        text: "Welcome to Perch! We'll begin by gathering some information about you to set up your profile. \nDon't worry about perfection - you can edit these fields afterwards at any time."
      },
      1: {
        comp: <UploadImage user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
        text: "Upload a profile image and your preferred name. Add a new image by dragging-and-dropping and adjust using the editing tools below.",
      },
      2: {
        comp: <PickYourInterests user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
        text: "Search skills and interests that apply to you, and click on the bubbles to add them to your profile."
      },
      3: {
        comp: "",
        text: "Enter your GPA, major (or intended major), and class year.",
      },
      4: {
        comp: <Experience user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
        text: "Enter any relevant lab or work experience and a short description of your contributions."
      },
      5: {
        comp: <EnterBio user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
        text: "Enter a short description to describe yourself research interests and experience." // add word limit
      },
      6: {
        comp: <Links user={this.state.user} updateUser={this.updateUser.bind(this)}/>,
        text: "If applicable, enter a link to your LinkedIn page and resume below. That's it!",
      },
    }
    var stepToRender = steps[this.state.curStep];
    if (this.state.curStep === 0) {
      backBtn = null;
    }
    else if (this.state.curStep === (this.state.numSteps - 1)) {
      nextBtn = <BasicButton msg='go to profile' superClick={() => this.sendUpdate(true)}/>
    }
    var css = "invisible";
    if (this.state.curStep === 1) {
      nextBtn = <BasicButton msg='next' superClick={() => {this.setState({curStep: this.state.curStep + 1}); this.updateTags()}}/>
    }
    if (this.state.curStep === 3) {
      css = "visible-yes";
      nextBtn = <BasicButton msg='next' superClick={() => {this.setState({curStep: this.state.curStep + 1}); this.sendUpdate()}}/>;
    }
    if (this.state.curStep === 4) {
      nextBtn = <BasicButton msg='next' superClick={() => {this.setState({curStep: this.state.curStep + 1}); this.updateExperience()}}/>
    }
    var dropDown = <div className={css}>
      <NotableClasses user={this.state.user} showForm={true} showAllEducation={true} updateUser={this.updateUser.bind(this)}/>
    </div>
		return (
      <div className="onboarding-container">
        {backBtn}
        {nextBtn}
        <ProgressIndicator steps={this.state.numSteps} curStep={this.state.curStep} />
        <div className="onboarding-text">{stepToRender.text}</div>
        {dropDown}
        {stepToRender.comp}
      </div>
		)
	}
}

export default StudentOnboarding;
