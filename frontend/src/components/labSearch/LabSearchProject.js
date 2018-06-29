import React, {Component} from 'react';
import './LabSearchProject.css';

class LabSearchProject extends Component {

	render() {
		return (
            <div className='lab-srch-project'>
                <div className='lab-srch-project-title'>
                    <span>{this.props.title}</span>
                    {this.props.urop && <span className='lab-srch-project-tag'>UROP</span>}
                </div>
                <div className='lab-srch-project-description'>{this.props.description}</div>
                <div className='lab-srch-project-apply'>Apply</div>
                <div className='lab-srch-project-openings'><b>1</b> spot</div>
            </div>
             
		);
	}
}

export default LabSearchProject;