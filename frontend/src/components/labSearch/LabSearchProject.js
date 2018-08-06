import React, {Component} from 'react';
import {addToStudentPositionList, removeFromStudentPositionList} from '../../helper.js'
import './LabSearchProject.css';

class LabSearchProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            added: this.props.saved,
            description: this.props.description,
        }
    }

    componentDidMount() {
        this.formatTitle()
    }

    saveProject = () => {
        addToStudentPositionList([this.props.id])
        this.toggleAdder()
    }

    removeProject = () => {
        removeFromStudentPositionList([this.props.id])
        this.toggleAdder()
    }

    toggleAdder = () => {
        this.setState({added: !this.state.added})
    }

    formatTitle = () => {
        if (this.props.description.length > 270) {
            this.setState({overflowDescription: true})
        }
        this.setState({description: this.props.description.slice(0,270)})
    }

	render() {
		return (
            <div className='lab-srch-project'>
                <div className='lab-srch-project-title-container'>
                    <span className='truncate lab-srch-project-title'>{this.props.title}</span>
                    {this.props.urop && <span className='lab-srch-project-tag'>UROP</span>}
                </div>
                <div className='lab-srch-project-description'>{this.state.description} <span className={this.state.overflowDescription ? 'ellipsis' : 'hide'}>...</span></div>
                <div className='lab-srch-project-apply lab-srch-project-action-label'><a href='mailto:bearb@umich.edu?subject=Dear Future Master&body=Plz take me into your lab. I beg you'>Apply</a></div>
                <div className='lab-srch-project-openings'><b>{this.props.spots}</b> {this.props.spots - 1 ? "spots" : "spot"}</div>
                {!this.state.added && <div className='lab-srch-project-adder lab-srch-project-action-label' onClick={this.saveProject}>save</div>}
                {this.state.added && <div className='lab-srch-project-adder lab-srch-project-action-label' onClick={this.removeProject}>remove</div>}
            </div>
             
		);
	}
}

export default LabSearchProject;