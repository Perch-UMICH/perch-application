// Text gathering component for both lab-name and lab-description pages

import React, {Component} from 'react';
import SquareButton from './SquareButton';
import './LabSpecifications.css';


class LabSpecifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specs: [
				{
					"id": "1",
					"text": "Spots open?"
				},
				{
					"id": "2",
					"text": "Paying lab assistants?"
				},
				{
					"id": "3",
					"text": "Accepting undergraduate students?"
				},
				{
					"id": "4",
					"text": "May assistants use for credit?"
				},
				{
					"id": "5",
					"text": "Nobel prize prerequisite?"
				},
				{
					"id": "6",
					"text": "Payment available in bitcoin?"
				},
				{
					"id": "7",
					"text": "Placeholder"
				},
				{
					"id": "7",
					"text": "Placeholder"
				},
			]
		};
	}

	render() {
		return (
			<div className='lab-specifications shift-down'>
				<div className='container center-align lab-specifications-form shadow'>
					<div className='lab-specifications-header'>Lab Specifications</div>
					<form className='lab-specifications-checklist'>
						<ul className = "columned-list">
					    {this.state.specs.map((spec) => {
							return (
								<li><input type="checkbox" className="checkbox-white filled-in" id={spec.id}/>
					      		<label className="lab-specifications-text" for={spec.id}>{spec.text}</label></li>);
						})}
						</ul>
					</form>
					<SquareButton destination='lab-website' label='next'/>
				</div>
			</div>
		);
	}
}
export default LabSpecifications;