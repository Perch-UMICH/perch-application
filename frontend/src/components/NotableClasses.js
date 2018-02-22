import React, {Component} from 'react';
import SquareButton from './SquareButton'
import $ from 'jquery'
import './NotableClasses.css';

class NotableClasses extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='notable-classes shift-down'>
				<div className='container center-align notable-classes-form shadow'>
					<div className='notable-classes-header'>Academics</div>
					<form className='container'>
						<div className='row'>
							<div className='input-field col s4'>
								<div className='notable-classes-label left-align'>GPA</div>
								<input className='gen-input' type='number' placeholder='4.0'/>
							</div>
							<div className='input-field col s4'>
								<div className='notable-classes-label left-align'>Major</div>
								<input className='gen-input' type='text' placeholder='your major'/>
							</div>
							<div className='input-field col s4'>
								<div className='notable-classes-label left-align'>Year</div>
								{/*<input className='gen-input' type='text' placeholder='year'/>*/}
								<select className='year-selector'>
							      <option className='year-selector-item' value="" disabled selected>Choose your year</option>
							      <option className='year-selector-item' value="1">freshman</option>
							      <option className='year-selector-item' value="2">sophomore</option>
							      <option className='year-selector-item' value="3">junior</option>
							      <option className='year-selector-item' value="4">senior</option>
							      <option className='year-selector-item' value="5">senior+</option>
							    </select>
							   
							</div>
						</div>
						<div className='notable-classes-label left-align'>List your notable classes</div>
						<textarea className='notable-classes-input' placeholder="EECS 281"></textarea>
						<SquareButton destination='student-profile' label='next'/>
					</form>
				</div>
			</div>
		);
	}
}

export default NotableClasses;