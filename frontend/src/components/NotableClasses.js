import React, {Component} from 'react';
import SquareButton from './SquareButton';
import $ from 'jquery';
import {updateStudent, getStudent, getCurrentUserId, getStudentFromUser} from '../helper.js';
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
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	componentDidMount() {
		console.log(this.state);
		var id = getCurrentUserId();
		getStudentFromUser(id).then( r => {
			this.setState({student_id: r.result.id, user_id: id});
			getStudent(this.state.student_id).then((resp) => {
				console.log(resp);
	            this.setState(
	            	{
	            		gpa: resp.data.gpa,
	            		major: resp.data.major,
	            		year: resp.data.year,
	            		classes: resp.data.classes,
	            	}
	            );
	            console.log(resp);
	        });
		});
		document.body.addEventListener('click', this.yearHandler);
	}

	updateClasses(event) {
		this.setState({ classes: event.target.value });
	}

	updateGPA(event) {
		this.setState({ gpa: event.target.value });
	}

	updateYear(event) {
		console.log("UPDATING YEAR");
		console.log(event.target.value);
		this.setState({ year: event.target.value });
	}

	updateMajor(event) {
		this.setState({ major: event.target.value });
	}

	saveAndContinue(event) {
		console.log("SELECTED: state:");
		console.log(this.state);
		var temp_year = $('#year_select').val();
		var year = this.state.year;
		if (temp_year) {
			year = temp_year;
		}
		updateStudent(this.state.student_id, null, null, this.state.major, year, this.state.gpa, null, null, null, this.state.classes, null).then(resp => {
			console.log("resp:");
			console.log(resp);
			window.location = '/student-profile/' + this.state.user_id;
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var btn_msg = 'next';
		var dest = '/student-bio';
		var header = 'Academics';
		if (url_arr[1] === "update-notable-classes") {
			btn_msg = 'save';
			dest = '/student-profile';
			header = 'Update Academics';
		}
		$('#year_select').on('change', function() {
			console.log("BLECH");
			console.log($(this));
		});

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
								<select className='year-selector' id="year_select" value={this.state.year}>
							      <option className='year-selector-item' value="" disabled>Choose your year</option>
							      <option className='year-selector-item' value="Freshman">Freshman</option>
							      <option className='year-selector-item' value="Sophomore">Sophomore</option>
							      <option className='year-selector-item' value="Junior" >Junior</option>
							      <option className='year-selector-item' value="Senior">Senior</option>
							      <option className='year-selector-item' value="Senior+">Senior+</option>
							    </select>
							   
							</div>
						</div>
						<div className='notable-classes-label left-align'>List your notable classes</div>
						<textarea className='notable-classes-input' id="textArea" type="text" 
							value= {this.state.classes}
							placeholder="EECS 281"
							onChange={event => this.updateClasses(event)}>
						</textarea>
						<SquareButton superClick={this.saveAndContinue} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default NotableClasses;