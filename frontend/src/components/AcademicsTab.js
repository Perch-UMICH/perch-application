import React, {Component} from 'react';
import {getCurrentUserId} from '../helper.js'
import './AcademicsTab.css';

class AcademicsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: window.location.pathname.split( '/' )[2],
		}
	}

	render() {
		return (
			<div className='tab-container'>
				<div className='tab-header tab academic-tab-header'>school
					<a href='/update-notable-classes' id="editImageText" className="null-link-style" >
					{ getCurrentUserId() == this.state.id && 
						<i className="material-icons interest-editor edit-icon" style={{float: 'right'}} >create</i>
					}
					</a>
				</div> 
				<div className='academics-tab left-align'>
					<div>
						<span className='academic-label'>GPA: </span>
						<span className='academic-info'>{this.props.GPA}</span>
					</div>
					<div>
						<span className='academic-label'>Year: </span>
						<span className='academic-info'>{this.props.year}</span>
					</div>
					<div>
						<span className='academic-label'>Major: </span>
						<span className='academic-info'>{this.props.major}</span>
					</div>
					<ul className='academic-label'>Notable Classes: 
						{/*this.props.classes.map((c) => <li className='academic-info'>{c}</li>)*/}
						<li className='academic-info'>{this.props.classes}</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default AcademicsTab;