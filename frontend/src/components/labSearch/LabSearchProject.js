import React, {Component} from 'react';
import './LabSearchProject.css';

class LabSearchProject extends Component {

	render() {
		return (
            <div className='lab-srch-project'>
                <div className='lab-srch-project-title'>
                    <span>{this.props.title}</span>
                    {this.props.urop && <span className='lab-srch-project-tag'>UROP</span>}
                    <div className='lab-srch-project-description'>{this.props.description}</div>
                </div>
                <div className='lab-srch-project-apply'>Apply</div>
                <div className='lab-srch-project-openings'>spots: 1</div>
            </div>
             
		);
	}
}

export default LabSearchProject;