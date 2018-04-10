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
				<div className='mobile-header tab academic-tab-header'>school
					<a href='/update-notable-classes' id="editImageText" className="null-link-style" >
					{ getCurrentUserId() === this.state.id && 
						<i className="material-icons interest-editor edit-icon" style={{float: 'right'}} >create</i>
					}
					</a>
				</div> 
				<div className='academics-tab left-align'>
					<div>
						<span className='academic-label'>GPA: </span>
						<span className='academic-info'>{this.props.gpa}</span>
					</div>
					<div>
						<span className='academic-label'>Year: </span>
						<span className='academic-info'>{this.props.year}</span>
					</div>
					<div>
						<span className='academic-label'>Major: </span>
						<span className='academic-info'>{this.props.major}</span>
					</div>
					<div className='classes-wrapper'>
						<span className='academic-label'>Notable Classes: </span>
						<span className='academic-info'>
							{/*this.props.classes.map((r)=>{r})*/}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default AcademicsTab;