import React, {Component} from 'react';
import { parse } from 'query-string';
import SquareButton from './SquareButton';
import BubbleChoice	from './BubbleChoice';
import Bubble from './Bubble';
import './PickYourInterests.css';

class PickYourInterests extends Component {
	constructor(props) {
		super(props);
		var url_arr = this.props.location.pathname.split('/');
		this.state = {
			catalog: [],
			interests: []
		};

		if (url_arr[1] === 'lab-skills' || url_arr[1] === 'update-skills' ) {
			var skills_catalog =  [
				"plating",
				"chromotography",
				"MatLab",
				"R",
				"C++",
				"Pen Testing",
			];
			var skills = [
				"pun making",
				"spectography",
				"total phosphorus digestion",
				"PCR",
			];
			this.state.catalog = skills_catalog;
			this.state.interests = skills;
		}
		else {
			var interests_catalog = [
				"oncology",
				"orange",
				"orangutan",
				"apples and orange",
				"virology",
				"basketweaving",
				"history",
				"chemistry",
				"physics",
				"astro-physics",
			];
			var interests = [
				"security",
				"fintech",
				"machine learning",
				"software development",
				"biomedical devices",
			];
			this.state.catalog = interests_catalog;
			this.state.interests = interests;
		}
	}

	render() {
		var header_txt, placeholder_txt, dest = "";
		var btn_label = 'next';
		var user_type = parse(this.props.location.search).user_type;
		var url_arr = this.props.location.pathname.split('/');

		if (url_arr[1] === 'pick-your-interests' || url_arr[1] === "update-interests") {
			if (user_type === "faculty") {
				header_txt = "Your Lab Labels";
				placeholder_txt = "descriptors for your lab work";
				dest = 'lab-skills?user_type=faculty';
			} 
			else {
				header_txt = "Your Interests";
				placeholder_txt = "field of interest";
				dest = 'lab-skills?user_type=student';
			}
		} 
		else if (url_arr[1] === 'lab-skills' || url_arr[1] === "update-skills") {
			if (user_type === "faculty") {
				header_txt = "Necessary Lab Skills";
				placeholder_txt = "Skills used to work in your lab";
				dest = 'lab-specifications';
			} 
			else {
				header_txt = "Your Lab Skills";
				placeholder_txt = "Skills you are competent in";
				dest = 'past-research';
			}
		}
		if (url_arr[1] === "update-interests" || url_arr[1] === "update-skills") {
			btn_label = "back";
			if (user_type === "faculty") {
				dest = 'prof-page';
			}
			else if (user_type === "student") {
				dest = 'student-profile';
			}
		}

		var display_info = {
			placeholder_txt: placeholder_txt,
			header_txt: header_txt,
			catalog: this.state.catalog,
			interests: this.state.interests
		};

		return(
			<div className='pick-your-interests shift-down container center-align'>
				<BubbleChoice display_info={display_info} />
				<SquareButton destination={dest} label={btn_label}/>
			</div>
		);
	}
}

export default PickYourInterests;