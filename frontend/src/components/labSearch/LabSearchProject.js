import React, {Component} from 'react';
import Apply from '../user/Apply'
import EditModal from '../utilities/modals/EditModal'
import {addToStudentPositionList, removeFromStudentPositionList, createApplicationResponse, getCurrentStudentId, submitStudentApplicationResponse} from '../../helper.js'
import './LabSearchProject.css';

class LabSearchProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            added: this.props.saved,
            position: this.props.position || {},
            question_resps: [],
        }
    }

    componentDidMount() {
        this.formatTitle()
    }

    openModal(id) {
  		if (document.getElementById(id)) {
  			document.getElementById(id).classList.add('activated');
        document.getElementById(`${id}-backdrop`).classList.add('activated');
  		}
  	}

    // updates application from question responses to be ready for submittal
    updateApplication = (question_resps) => {
      this.setState({question_resps});
    }

    // Update this function with backend functionality to save application
    // You can access the response under 'this.state.question_resps'
    submitApplication = () => {
        let resps = []
        if (this.state.question_resps) 
            this.state.question_resps.map(q => resps.push(q.response))

            let application = {
            student_id: getCurrentStudentId(),
            position_id: this.state.position.id,
            responses: resps,
        }

		createApplicationResponse(application).then(resp => {
			if (resp.data)
                submitStudentApplicationResponse(resp.data.id).then(r => {
					alert("Application Successfully Submitted!")
				});
        });
    }

    saveProject = () => {
        addToStudentPositionList([this.props.position.id])
        this.toggleAdder()
    }

    removeProject = () => {
        console.log('look here', this.props.position)
        removeFromStudentPositionList([this.props.position.id])
        this.toggleAdder()
        this.props.updateProjects(this.props.position.id)
    }

    toggleAdder = () => {
        this.setState({added: !this.state.added})
    }

    formatTitle = () => {
        let newPos = this.state.position;
        if (newPos.description && newPos.description.length > 270) {
            this.setState({overflowDescription: true})
            newPos.description = newPos.description.slice(0,270);
        }
        this.setState({position: newPos})
    }

	render() {
    var applyButton =
      <div className='lab-srch-project-apply lab-srch-project-action-label'><a onClick={() => this.openModal(`${this.state.position.id}-apply`)}>Apply</a></div>

    var saveRemoveButton =
      <div>
        {!this.state.added && <div className='lab-srch-project-adder lab-srch-project-action-label' onClick={this.saveProject}>save</div>}
        {this.state.added && <div className='lab-srch-project-adder lab-srch-project-action-label' onClick={this.removeProject}>remove</div>}
      </div>

    // if the user is viewing this project on their lab dashboard page in the 'applied' section, don't show the 'apply' and 'save' buttons
    if (this.props.applied) {
      applyButton = null;
      saveRemoveButton = null;
    }

		return (
            <div className='lab-srch-project'>
                <EditModal id={`${this.state.position.id}-apply`} wide={true} actionName="submit"
                  title={`Apply To ${this.state.position.title}`} modalAction={this.submitApplication}>
                  <Apply updateQuestions={this.updateApplication} position={this.state.position}/>
                </EditModal>
                <div className='lab-srch-project-title-container'>
                    <a className='truncate lab-srch-project-title' href={`prof-page/${this.props.id}`}>{this.state.position.title}</a>
                    {this.props.urop && <span className='lab-srch-project-tag'>UROP</span>}
                </div>
                <div className='lab-srch-project-description'>{this.state.position.description} <span className={this.state.overflowDescription ? 'ellipsis' : 'hide'}>...</span></div>
                {applyButton}
                <div className='lab-srch-project-openings'><b>{this.state.position.spots}</b> {this.state.position.spots - 1 ? "spots" : "spot"}</div>
                {saveRemoveButton}
            </div>

		);
	}
}

export default LabSearchProject;
