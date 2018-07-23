import React, {Component} from 'react';
import './LabSearchProject.css';

class LabSearchProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            added: true,
        }
    }

    toggleAdder = () => {
        this.setState({added: !this.state.added})
    }

	render() {
		return (
            <div className='lab-srch-project'>
                <div className='lab-srch-project-title'>
                    <span>{this.props.title}</span>
                    {this.props.urop && <span className='lab-srch-project-tag'>UROP</span>}
                </div>
                <div className='lab-srch-project-description'>{this.props.description}</div>
                <div className='lab-srch-project-apply lab-srch-project-action-label'><a href='mailto:bearb@umich.edu?subject=Dear Future Master&body=Plz take me into your lab. I beg you'>Apply</a></div>
                <div className='lab-srch-project-openings'><b>{this.props.spots}</b> {this.props.spots - 1 ? "spots" : "spot"}</div>
                {this.state.added && <div className='lab-srch-project-adder lab-srch-project-action-label' onClick={this.toggleAdder}>save</div>}
                {!this.state.added && <div className='lab-srch-project-adder lab-srch-project-action-label' onClick={this.toggleAdder}>remove</div>}
            </div>
             
		);
	}
}

export default LabSearchProject;