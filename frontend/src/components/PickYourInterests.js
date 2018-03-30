import React, {Component} from 'react';
import { parse } from 'query-string';
import SquareButton from './SquareButton';
import BubbleChoice	from './BubbleChoice';
import Bubble from './Bubble';
import {getStudent, getLab, addSkillsToLab, addTagsToLab, addSkillsToStudent, addTagsToStudent, getAllSkills, getAllTags, getCurrentUserId, getStudentFromUser} from '../helper.js';
import './PickYourInterests.css';

class PickYourInterests extends Component {
	constructor(props) {
		super(props);
		var url_arr = this.props.location.pathname.split('/');
		this.state = {
			dest: '',
			student_id: 1,
			lab_id: 1,
			display_info: {
				placeholder_txt: '',
				header_txt: '',
				catalog: [],
				interests: [],
				user_id: 1,
			},
			user_id: getCurrentUserId(),
			bubble_array: [],
		};
		
		this.updateBubbleChoice = this.updateBubbleChoice.bind(this);
		this.saveAndContinue = this.saveAndContinue.bind(this);
	}

	componentDidMount() {
		var header_txt, placeholder_txt, dest = "";
		var btn_label = 'back';
		var user_type = parse(this.props.location.search).user_type;
		var url_arr = this.props.location.pathname.split('/');
		getStudentFromUser(this.state.user_id).then( r => this.setState({s_id: r.result.id}))

		if (url_arr[1] === "update-interests") {
			if (user_type === "faculty") {
	            this.setState({ 
					dest: 'prof-page',
					display_info: Object.assign({}, this.state.display_info, {
				      	header_txt: "Your Lab Labels",
				  		placeholder_txt: "descriptors for your lab work",
				  		user_type: 'faculty',
				  		req_type: 'tags',
					}),
				});
			} 
			else {
			    this.setState({ 
					dest: 'student-profile',
					display_info: Object.assign({}, this.state.display_info, {
		      	    	header_txt: "Your Interests",
		      			placeholder_txt: "field of interest",
		      			user_type: 'student',
		      			req_type: 'tags',
					}),
				});
			}
		} 
		else if (url_arr[1] === "update-skills") {
			if (user_type === "faculty") {
                this.setState({ 
					dest: 'prof-page',
					display_info: Object.assign({}, this.state.display_info, {
		      	    	header_txt: "Necessary Lab Skills",
						placeholder_txt: "Skills used to work in your lab",
						user_type: 'faculty',
						req_type: 'skills',
					}),
                });
			} 
			else {
                this.setState({ 
					dest: 'student-profile',
					display_info: Object.assign({}, this.state.display_info, {
		      	    	header_txt: "Your Lab Skills",
						placeholder_txt: "Skills you are competent in",
						user_type: 'student',
						req_type: 'skills',
					}),
                });
			}
		}
	}

	saveAndContinue(event) {
		console.log("tag/skill array to add:");
		console.log(this.state.bubble_array);
		var item_ids = this.state.bubble_array.map((item) => {
			return item.id;
		});
		console.log(item_ids);
		if (this.state.user_type === 'faculty') {
			if (this.state.req_type === 'skills') {
				addSkillsToLab(this.state.s_id, item_ids).then(resp => {
					console.log(resp);
				});
			} else {
				addTagsToLab(this.state.s_id, item_ids).then(resp => {
					console.log(resp);
				});
			}
		} else {
			if (this.state.req_type === 'skills') {
				addSkillsToStudent(this.state.s_id, item_ids).then(resp => {
					console.log(resp);
				});
			} else {
				addTagsToStudent(this.state.s_id, item_ids).then(resp => {
					console.log(resp);
				});
			}
		}
		//window.location = this.state.dest;
	}

	updateBubbleChoice(choices) {
	    this.setState({ bubble_array: choices });
	}

	render() {
		return(
			<div className='pick-your-interests shift-down container center-align'>
				{/*
				{this.state.bubble_array.map((bubble) => {
					return (<div key={bubble.id}> {bubble.name} </div>)
				})}*/}
				<BubbleChoice ref='bubble_choice' display_info={this.state.display_info} callbackSkills={this.updateBubbleChoice}/>
				<SquareButton superClick={this.saveAndContinue} label='save'/>
			</div>
		);
	}
}

export default PickYourInterests;