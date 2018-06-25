import React, {Component} from 'react';
import SquareButton from '../../utilities/buttons/SquareButton';
import $ from 'jquery';
import {updateStudent, getStudent, getCurrentUserId, getCurrentStudentId, getStudentFromUser} from '../../../helper.js';
import './NotableClasses.css';

class NotableClasses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: '',
			gpa: '4.0',
			year: '',
			major: '',
			student_id: getCurrentStudentId(),
			class_arr: [],
			url_string: this.props.location.pathname.split('/')[1],
		};
		this.saveAndContinue = this.saveAndContinue.bind(this);
		this.state.c_index = this.state.class_arr.length;
	}

	componentDidMount() {
		var id = getCurrentUserId();
		if (id) {
			getStudentFromUser(id).then( r => {
				this.setState({student_id: r.result.id, user_id: id});
				getStudent(this.state.student_id).then((resp) => {
					var class_arr = [];
					var class_str_arr = [''];
					if (resp.data.classes) {
						class_str_arr = resp.data.classes.split('|');
					}
					var index = 1;
					for (var i = 0; i < class_str_arr.length; ++i) {
						var class_item = {
							id: `c_${index}`,
							text: class_str_arr[i],
						}
						class_arr.push(class_item);
						++index;
					}
		            this.setState(
		            	{
		            		gpa: resp.data.gpa,
		            		major: resp.data.major,
		            		year: resp.data.year,
		            		classes: class_str_arr,
		            		class_arr: class_arr,
		            		c_index: index,
		            	}
		            );
		            console.log(resp);
		        });
			});
		}
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

	addClass(event) {
		var newClassID = "c_" + this.state.c_index;
		var newClassText = '';
		var newClass = {
			"id": newClassID,
			"text": newClassText
		};
		var newCIndex = this.state.c_index + 1;
		var updated_classes = this.state.class_arr.concat([newClass]);
		this.setState({ 
			class_arr: updated_classes, 
			c_index: newCIndex,
		});
	}

	alterClass(event, class_id) {
		var temp_classes = this.state.class_arr;
		var index = temp_classes.findIndex(item => item.id === class_id);
		temp_classes[index].text = event.target.value;
		this.setState({ 
			class_arr: temp_classes,
		});
	}

	removeClass(class_id) {
		this.setState((prevState) => {
			var temp_classes = prevState.class_arr;
			var removeIndex = temp_classes.map(function(item) { return item.id; }).indexOf(class_id);
			temp_classes.splice(removeIndex, 1);
			return { 
				class_arr: temp_classes,
			};
		});
	}

	saveAndContinue(event) {
		console.log("SELECTED: state:");
		console.log(this.state);
		var temp_year = $('#year_select').val();
		var year = this.state.year;
		if (temp_year) {
			year = temp_year;
		}
		var classString = this.state.class_arr[0].text;;
		for (var i = 1; i < this.state.class_arr.length; ++i) {
			classString += '|' + this.state.class_arr[i].text;
		}
		updateStudent(this.state.student_id, null, null, this.state.major, year, this.state.gpa, null, null, null, classString, null).then(resp => {
			console.log(resp);
		}).then(resp => {
			if (this.state.url_string === "update-notable-classes") {
				window.location = `/student-profile/${getCurrentUserId()}`;
			} else {
				window.location = '/past-research';
			}
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var btn_msg = 'next';
		var header = 'Academics';
		if (url_arr[1] === "update-notable-classes") {
			btn_msg = 'save';
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
						<div className='notable-classes-label left-align class-creation-label'>
							List your notable classes
							<a onClick={this.addClass.bind(this)} id="addQuestion" > <i className="material-icons">add</i></a>
						</div>
					    {this.state.class_arr.map((c) => {
							return (
								<div className="row" key={c.id}>
									<div className="col s11">
										{/*TODO: TURN TEXTAREA INTO A COMPONENT*/}
										<textarea id={c.id} type="text" placeholder="EECS 281" className='notable-classes-input' id="class-input" rows='1' value={c.text} onChange={event => this.alterClass(event, c.id)} required></textarea>
									</div>
									<div className="col s1">
										<a id={c.id} className="remove-question" onClick={() => this.removeClass(c.id)}><i className="material-icons interest-editor opacity-1">clear</i></a>
									</div>
								</div>);
						})} <br/>
						<SquareButton superClick={this.saveAndContinue} label={btn_msg}/>
					</form>
				</div>
			</div>
		);
	}
}

export default NotableClasses;