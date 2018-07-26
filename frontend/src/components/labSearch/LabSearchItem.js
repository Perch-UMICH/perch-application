import React, {Component} from 'react';
import LabSearchProject from './LabSearchProject'
import ExpanderIcons from '../utilities/ExpanderIcons'
import './LabSearchItem.css';

class LabSearchItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numProjects: null,
            all_projects: []
        }
    }

    componentDidMount() {
        var projects = [];
        this.props.positions.map((position) => {
            let urop = position.is_urop_project;
            projects.push(<LabSearchProject title={position.title} spots='MISSING' description={position.description} urop/>)
        })
        this.setState({
            numProjects: document.getElementById(`lab_srch_expansion_${this.props.name}`).children.length,
            all_projects: projects
        });
    }

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
        expansion.classList.toggle('hide-projects')
        // toggleExpanderIcons();
    }

	render() {
		return (
            <div className='lab-srch-item-container'>
                <div id={`lab_srch_item_${this.props.name}`} className='lab-srch-item'> 
                    <img src={this.props.img} className='lab-srch-item-pic' />
                    <div className='lab-srch-item-name'>{this.props.name}</div>
                    <div className='lab-srch-item-depts'><b>Departments:</b> {this.props.dept}</div>
                    <div className='lab-srch-item-rsrch'><b>Research Areas:</b> {this.props.rsrch}</div>
                    <div className='lab-srch-item-description'><b>Description</b> {this.props.description}</div>
                    <div id={`lab-srch-item-num-projects_${this.props.name}`} className='lab-srch-item-num-projects' onClick={this.expandProjects.bind(this)}><b>{this.state.numProjects}</b> {this.state.numProjects - 1 ? "Projects" : "Project"}</div>
                    <ExpanderIcons id={`lab-srch-item_${this.props.name}`} action={this.expandProjects.bind(this)}/>
                </div>

                <div id={`lab_srch_expansion_${this.props.name}`} className='lab-srch-item-expansion hide-projects'>
                    {this.state.all_projects}
                </div>
            </div>
		);
	}
}

export default LabSearchItem;