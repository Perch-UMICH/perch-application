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
					"id": "s_1",
					"text": "Spots open?"
				},
				{
					"id": "s_2",
					"text": "Paying lab assistants?"
				},
				{
					"id": "s_3",
					"text": "Accepting undergraduate students?"
				},
				{
					"id": "s_4",
					"text": "May assistants use for credit?"
				},
				{
					"id": "s_5",
					"text": "Nobel prize prerequisite?"
				},
				{
					"id": "s_6",
					"text": "Payment available in bitcoin?"
				},
				{
					"id": "s_7",
					"text": "Placeholder"
				},
				{
					"id": "s_8",
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