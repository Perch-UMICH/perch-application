import React, {Component} from 'react';
import SquareButton from './SquareButton'
import $ from 'jquery'
import './NotableClasses.css';

class NotableClasses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: '',
			gpa: '',
			year: '',
			major: '',
		};
		if (this.props.location.pathname.split('/')[1] === 'update-notable-classes') {
			this.state.classes = "EECS 281\nEECS 370\nEECS 380";
			this.state.gpa = 3.9;
			this.state.year = "Junior";
			this.state.major = "Computer Science";
		}
	}

	updateClasses(event) {
		this.setState({ classes: event.target.value });
	}

	updateGPA(event) {
		this.setState({ gpa: event.target.value });
	}

	updateYear(event) {
		this.setState({ year: event.target.value });
	}

	updateMajor(event) {
		this.setState({ major: event.target.value });
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var btn_msg = 'next';
		var dest = 'notable-classes';
		var header = 'Academics';
		if (url_arr[1] === "update-notable-classes") {
			btn_msg = 'back';
			dest = '/student-profile';
			header = 'Update Academics';
		}
		
		return (
			<div className='notable-classes shift-down'>
				<div className='container center-align notable-classes-form shadow'>
					<div className='notable-classes-header'>{header}</div>
					<form className='container'>
						<div className='row'>
							<div className='input-field col s4'>
								<div className='notable-classes-label left-align'>GPA</div>
								<input className='gen-input' type='number' step="0.1"
									placeholder='4.0' value={this.state.gpa} 
									onChange={event => this.updateGPA(event)} />
							</div>
							<div className='input-field col s4'>
								<div className='notable-classes-label left-align'>Major</div>
								<input className='gen-input' type='text' 
									placeholder='your major' value = {this.state.major}
									onChange={event => this.updateMajor(event)} />
							</div>
							<div className='input-field col s4'>
								<div className='notable-classes-label left-align'>Year</div>
								{/*<input className='gen-input' type='text' placeholder='year'/>*/}
								<select className='year-selector' value={this.state.year} onChange={event => this.updateYear(event)}>
							      <option className='year-selector-item' value="" disabled selected>Choose your year</option>
							      <option className='year-selector-item' value="Freshman">freshman</option>
							      <option className='year-selector-item' value="Sophomore">sophomore</option>
							      <option className='year-selector-item' value="Junior">junior</option>
							      <option className='year-selector-item' value="Senior">senior</option>
							      <option className='year-selector-item' value="Senior+">senior+</option>
							    </select>
							   
							</div>
						</div>
						<div className='notable-classes-label left-align'>List your notable classes</div>
						<textarea className='notable-classes-input' id="textArea" type="text" 
							value= {this.state.classes}
							placeholder="EECS 281"
							onChange={event => this.updateClasses(event)}>
						</textarea>
						<SquareButton destination={dest} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default NotableClasses;