import React, {Component} from 'react';
import { parse } from 'query-string';
import {cyan500} from 'material-ui/styles/colors';
import SquareButton from './SquareButton';
import BasicButton from './BasicButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import $ from 'jquery';
import './ScheduleInterview.css';

const muiTheme = getMuiTheme({
    fontFamily: 'Impact',
    datePicker: {
		selectColor: '#FF0000',
	},
});

class ScheduleInterview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			labID: 'infantCogProj12628',
			dateTime: null,
			slots: [],
			date: '',
			startTime: '',
			endTime: '',
			interviewee: 'Jessica Roberts',
			btn_msg: 'send',
			formFilled: true,
		};
		this.handleDate = this.handleDate.bind(this);
		this.handleStartTime = this.handleStartTime.bind(this);
		this.handleEndTime = this.handleEndTime.bind(this);
		this.state.s_index = this.state.slots.length;
	}

	handleStartTime(event, time){
		this.setState({startTime: time});
	}

	handleEndTime(event, time){
		this.setState({endTime: time});
	}

	handleDate(event, date){
		this.setState({date: date});
	}

	addSlot(event) {
		if ($('#startTimePick').val() === '' || $('#endTimePick').val() === '' || 
			$('#address-input').val() === '' || $('#datePick').val() === '') {
			this.setState({ formFilled: false });
			return;
		}
		this.setState({ formFilled: true });
		var date_arr = new Date($('#datePick').val()).toUTCString().split(" ");  
		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var newSlotId = "s_" + this.state.s_index + '_' + this.state.labID;
		var newSlot = {
			"id": newSlotId,
			"day": date_arr[0],
			"date": date_arr[1], // date.toLocaleTimeString("en-us", options), // $('#datePick').val(),
			"month": date_arr[2], 
			"year": date_arr[3], 
			"startTime": $('#startTimePick').val(),
			"endTime": $('#endTimePick').val(),
			"location": $('#address-input').val(),
		};
		var newSIndex = this.state.s_index + 1;
		var updated_slots = this.state.slots.concat([newSlot]);
		var btn_msg = 'send ' + updated_slots.length + ' slots'; 
		if (updated_slots.length === 1) {
			btn_msg = btn_msg.slice(0, -1); 
		}
		this.setState({ 
			slots: updated_slots, 
			s_index: newSIndex,
			btn_msg: btn_msg,
		});
	}

	removeSlot(slot_id) {
		this.setState((prevState) => {
			var temp_slots = prevState.slots;
			var removeIndex = temp_slots.map(function(item) { return item.id; }).indexOf(slot_id);
			temp_slots.splice(removeIndex, 1);
			var btn_msg = 'send ' + temp_slots.length + ' slots'; 
			if (temp_slots.length === 1) {
				btn_msg = btn_msg.slice(0, -1); 
			}
			return { 
				slots: temp_slots,
				btn_msg: btn_msg,
			};
		});
	}

	render() {
		var url_arr = this.props.location.pathname.split('/');
		var student_name = '';
		if (!url_arr[2]) {
			student_name = '[No Student Given]';
		} 
		else {
			var temp_arr = url_arr[2].split('-');
			for (var i = 0; i < temp_arr.length; i++) {
				var upperCase = temp_arr[i].charAt(0).toUpperCase() + temp_arr[i].slice(1) + ' ';
				student_name = student_name.concat(upperCase);
			}
		}
		var dest = '/prof-page';
		var btn_msg = 'send';
		var update = false;

		return (
			<div className='schedule-interview shift-down'>
				<div className='container center-align schedule-interview-form shadow'>
					<div className='schedule-interview-header'>
						Schedule an Interview 
					</div>
					<p className="white-text schedule-interview-desc"> Create interview slots (available times and locations) for {student_name} to choose from:</p>
					<input id='address-input' className='flow-text' placeholder='interview location (e.g. 3400 EECS, Mujo)'></input>
					<div className="container">
						<MuiThemeProvider theme={muiTheme}>
							<DatePicker 
								id = 'datePick'
								onChange={this.handleDate} 
								value ={this.state.date} 
								hintText="Date" />
							<TimePicker 
								id = 'startTimePick'
								onChange={this.handleStartTime} 
								value={this.state.startTime} 
								hintText="Start Time" />
							<TimePicker 
								id = 'endTimePick'
								onChange={this.handleEndTime} 
								value={this.state.endTime} 
								hintText="End Time" />
						</MuiThemeProvider>
						<br/>
						<BasicButton superClick={this.addSlot.bind(this)} color='light' msg='add slot' />
						{ this.state.formFilled ? null : <p class='error-text'> Please fill out all location/date/time information </p> }
					</div>
					<br/>
						<div class="row">
							{this.state.slots.map((slot) => {
								return (
									<div class="col s4 m3">
										<div class="card">
											<div class="tab-header">
												<a id={slot.id} onClick={() => this.removeSlot(slot.id)}>
													<i className="material-icons remove-card edit-icon">clear</i>
												</a>
											</div>
											<div class="card-content">
												<h5 className='day-disp' >{slot.day}</h5>
												<h4>{slot.month} {slot.date}</h4>
												<h5 className='year-disp'>{slot.year}</h5>
												<div className='time-disp'> {slot.startTime} to {slot.endTime} </div>
											</div>
											<div class="card-image blue white-text">
												@ {slot.location}
											</div>
										</div>
									</div>
								);
							})}
						 </div>
					<div className="container">
						{ (this.state.slots.length !== 0) ? <SquareButton destination={dest} label={this.state.btn_msg}/> : null }
					 </div>
				</div>
			</div>
		);
	}
}

export default ScheduleInterview;