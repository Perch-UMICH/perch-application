import React, {Component} from 'react';
//import { parse } from 'query-string';
//import {cyan500} from 'material-ui/styles/colors';
import SquareButton from './SquareButton';
//import BasicButton from './BasicButton';
//import DatePicker from 'material-ui/DatePicker';
//import TimePicker from 'material-ui/TimePicker';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PickInterviewModal from './PickInterviewModal';
import $ from 'jquery';

class ScheduleInterview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			interviewChoices: [
				{
					lab: 'The Infant Cognition Project',
					lab_link: '/prof-page/the-infant-cognition-project',
					slots: [
						{
							"id": 's_0_infCogProj12132',
							"day": 'Mon',
							"date": '12',
							"month": 'Apr', 
							"year": '2018', 
							"startTime": '4:30 pm',
							"endTime": '5:00 pm',
							"location": 'EECS 3569',
						},
						{
							"id": 's_1_infCogProj12132',
							"day": 'Tues',
							"date": '13',
							"month": 'Apr', 
							"year": '2018', 
							"startTime": '12:30 pm',
							"endTime": '2:00 pm',
							"location": 'Mujo',
						},
						{
							"id": 's_2_infCogProj12132',
							"day": 'Fri',
							"date": '16',
							"month": 'Apr', 
							"year": '2018', 
							"startTime": '5:30 pm',
							"endTime": '6:15 pm',
							"location": 'Palmer Commons',
						},
						{
							"id": 's_3_infCogProj12132',
							"day": 'Mon',
							"date": '21',
							"month": 'Apr', 
							"year": '2018', 
							"startTime": '1:45 pm',
							"endTime": '2:15 pm',
							"location": 'Dude Basement',
						},
					],
				}
			],
			setInterviews: [
				{
					lab: "Grace's Awesome Grasshopper Lab",
					lab_link: '/prof-page/graces-awesome-lab',
					slot: {
						"id": 's_0_gsawesomelab12123',
						"day": 'Tues',
						"date": '17',
						"month": 'May', 
						"year": '2018', 
						"startTime": '4:30 pm',
						"endTime": '5:00 pm',
						"location": 'The Floor',
					}
				},
				{
					lab: "Ralf's Rad Radix Optimizations",
					lab_link: '/prof-page/rad-radix-optimizations',
					slot: {
						"id": 's_0_ficRadRad2138',
						"day": 'Fri',
						"date": '17',
						"month": 'March', 
						"year": '2018', 
						"startTime": '1:30 pm',
						"endTime": '2:00 pm',
						"location": 'Chem 1300B',
					},
				}
			],
			currentChoice: {
				lab: '',
				lab_link: '',
				slot: [],
			},
			btn_msg: 'return to profile',
			formFilled: true,

		};
		this.openPickModal = this.openPickModal.bind(this);
		this.setInterview = this.setInterview.bind(this);
		this.state.s_index = this.state.setInterviews.length;
	}

	openPickModal(lab, slot_id) {
		var labIndex = this.state.interviewChoices.map(function(item) { return item.lab; }).indexOf(lab);
		var slotIndex = this.state.interviewChoices[labIndex].slots.map(function(item) { return item.id; }).indexOf(slot_id);
		this.setState({ 
			currentChoice: {
				lab: lab,
				lab_link: this.state.interviewChoices[labIndex].lab_link,
				slot: this.state.interviewChoices[labIndex].slots[slotIndex],
			}
		}, () => {
			$('#pickModal').fadeIn("slow");
			$('#modalBackdrop').fadeIn("slow");
		});
	}

	setInterview(event) {
		$('#modalBackdrop').fadeOut("slow");
		$('#pickModal').fadeOut('slow');
		this.setState((prevState) => {
			var temp_choices = prevState.interviewChoices;
			var removeIndex = temp_choices.map(function(item) { return item.lab; }).indexOf(prevState.currentChoice.lab);
			temp_choices.splice(removeIndex, 1);
			var new_interview = prevState.currentChoice;
			var temp_set = prevState.setInterviews.concat([new_interview]);
			return { 
				interviewChoices: temp_choices,
				setInterviews: temp_set,
			};
		});
	}

	render() {
		// var dest = '/prof-page';
		// var btn_msg = 'send';
		// var update = false;

		return (
			<div className='schedule-interview shift-down'>
				<div className='container center-align schedule-interview-form shadow'>
					<div className='schedule-interview-header'>
						Your Interviews
					</div>
					<p className="white-text schedule-interview-desc">
						You have <b>{this.state.interviewChoices.length}</b> 
						{ this.state.interviewChoices.length === 1 ? " lab who would like to schedule an interview " : " labs who would like to schedule interviews " }  
						and <b>{this.state.setInterviews.length}</b> upcoming {this.state.setInterviews.length === 1 ? " interview": " interviews" }.
					</p>
					{ this.state.interviewChoices.length > 0 ? 
						<div>
						{/*<h5 className='white-text'> Schedule ({this.state.interviewChoices.length})</h5>*/}
						{this.state.interviewChoices.map((choice) => {
							return (
							<div className='interview-choices'>
								<p className='white-text'> 
									<a href={choice.lab_link} target='_blank' className='lab-title-disp-blue'>
									{choice.lab}</a> would like to schedule an interview with you! <br/> 
									Pick which slot works best for you below: 
								</p>
								<div class="row">
									{choice.slots.map((slot) => {
										return (
											<div class="col s12 m6 l3" onClick={() => this.openPickModal(choice.lab, slot.id)}>
												<div class="card select-card">
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
							 </div>
							);
						})}
						</div>
						: null
					}
					{ this.state.setInterviews.length > 0 ? 
						<div>
							<h5 className='white-text'> Upcoming Interviews </h5>
							<div class='row'>
							{this.state.setInterviews.map((interview) => {
								return (
									<div class="col s12 m4">
										<div class="card">
											<div class="card-content">
												<a href={interview.lab_link} target='_blank' className='lab-title-disp'> {interview.lab} </a>
												<h5 className='day-disp' >{interview.slot.day}</h5>
												<h4>{interview.slot.month} {interview.slot.date}</h4>
												<h5 className='year-disp'>{interview.slot.year}</h5>
												<div className='time-disp'> {interview.slot.startTime} to {interview.slot.endTime} </div>
											</div>
											<div class="card-image blue white-text">
												@ {interview.slot.location}
											</div>
										</div>
									</div>
								);
							})}
							</div>
						</div>
					: null }
					{0<0 && 
					<div className="container">
						<SquareButton destination="/student-profile" label={this.state.btn_msg}/>
					 </div>}
				</div>
				<PickInterviewModal interview={this.state.currentChoice} confirm={this.setInterview} />
			</div>
		);
	}
}

export default ScheduleInterview;