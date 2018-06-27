import React, {Component} from 'react';
import LabSearchProject from './LabSearchProject'
import './LabSearchItem.css';

class LabSearchItem extends Component {

    expandProjects() {
        let toggleExpanderIcons = () => {
            let lab_srch_item = document.getElementById(`lab_srch_item_${this.props.name}`)
            let expanderIcons = lab_srch_item.children[lab_srch_item.children.length - 1];
            for (let i = 0; i < expanderIcons.children.length; i++)
                expanderIcons.children[i].innerText = (expanderIcons.children[i].innerText == 'expand_more') ? 'expand_less' : 'expand_more';
            expanderIcons.classList.toggle('active-blue')
        }

        let numProjects = document.getElementById(`lab-srch-item-num-projects_${this.props.name}`)
        numProjects.classList.toggle('active-blue-bg')

        let expansion = document.getElementById(`lab_srch_expansion_${this.props.name}`)
        expansion.classList.toggle('hide')
        toggleExpanderIcons();
    }

	render() {
		return (
            <div>
                <div id={`lab_srch_item_${this.props.name}`} className='lab-srch-item'> 
                    <img src={this.props.img} className='lab-srch-item-pic' />
                    <div className='lab-srch-item-name'>{this.props.name}</div>
                    <div className='lab-srch-item-depts'><b>Departments:</b> {this.props.dept}</div>
                    <div className='lab-srch-item-rsrch'><b>Research Areas:</b> {this.props.rsrch}</div>
                    <div className='lab-srch-item-description'><b>Description</b> {this.props.description}</div>
                    <div id={`lab-srch-item-num-projects_${this.props.name}`} className='lab-srch-item-num-projects' onClick={this.expandProjects.bind(this)}><b>2</b> projects</div>
                    <div className='lab-srch-item-expand-icons' onClick={this.expandProjects.bind(this)}>
                        <i className='material-icons'>expand_more</i>
                        <i className='material-icons'>expand_more</i>
                        <i className='material-icons'>expand_more</i>
                    </div>
                </div>

                <div id={`lab_srch_expansion_${this.props.name}`} className='lab-srch-item-expansion hide'>
                    <LabSearchProject title='Data Analysis' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job.' urop/>
                    <LabSearchProject title='Coffee Runner' description='We need you to do stuff on this project. Cause research funding crisis. And we need hands on the job.' />
                </div>
            </div>
		);
	}
}

export default LabSearchItem;