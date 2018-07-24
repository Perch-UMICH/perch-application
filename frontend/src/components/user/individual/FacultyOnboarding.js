import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
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

class FacultyOnboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curStep: 0,
      numSteps: 6,
      steps: {
        0: <EnterContact />,
        1: <EnterBio />,
        2: <UploadImage />,
        3: <Experience />,
        4: <Education />,
        5: <Links prof={true}/>,
      }
    }
  }

  redirect() {
    window.location = '/prof/1';
  }

	render() {
    var backBtn = <BasicButton msg='back' superClick={() => this.setState({curStep: this.state.curStep - 1})}/>;
    var nextBtn = <BasicButton msg='next' superClick={() => this.setState({curStep: this.state.curStep + 1})}/>;
    var stepToRender = this.state.steps[this.state.curStep];
    if (this.state.curStep === 0) {
      backBtn = null;
    }
    else if (this.state.curStep === (this.state.numSteps - 1)) {
      nextBtn = <BasicButton msg='go to profile' superClick={this.redirect.bind(this)}/>
    }
		return (
      <div className="onboarding-container">
        {backBtn}
        {nextBtn}
        <ProgressIndicator steps={this.state.numSteps} curStep={this.state.curStep} />
        {stepToRender}
      </div>
		)
	}
}

export default FacultyOnboarding;
