import React, {Component} from 'react';
import { parse } from 'query-string';
import SquareButton from './SquareButton';
import Bubble from './Bubble';
import './PickYourInterests.css';

class PickYourInterests extends Component {
	constructor(props) {
		super(props);
		var url_arr = this.props.location.pathname.split('/');
		this.state = {
			catalog: [],
			interests: [],
			filtered_catalog: [],
			in_filter: false
		};

		if (url_arr[1] === 'lab-skills') {
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

	componentWillMount() {
    	this.setState({filtered_catalog: this.state.catalog});
  	}

	filterList(event) {
		var updatedList = this.state.catalog;
    	updatedList = updatedList.filter(function(item){
      	return item.toLowerCase().search(
        	event.target.value.toLowerCase()) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList, in_filter: true});
	}

	handleClickAdd(interest, temporary) {
		this.setState((prevState) => {
			var temp_add = prevState.interests;
			var temp_delete = prevState.catalog;
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			if (temporary != "default") {
				temp_filter.splice(temp_filter.indexOf(interest), 1);
			}
			else if (this.state.in_filter) {
				temp_filter.splice(temp_filter.indexOf(interest), 1);
			}

			return {catalog: temp_delete, interests: temp_add, filtered_catalog: temp_filter};
		});
	}

	handleClickDelete(interest, temporary) {
		this.setState((prevState) => {
			var temp_delete = prevState.interests;
			var temp_add = prevState.catalog;
			var temp_filter = prevState.filtered_catalog;
			temp_add.push(interest);
			temp_delete.splice(temp_delete.indexOf(interest), 1);

			let check = prevState.in_filter;
			if (interest.includes(temporary.toString())) {
				if (temporary != "default") {
					temp_filter.push(interest);
				}
			}
			else if (check && (temporary == "default")) {
				temp_filter.push(interest);
			}

			return {catalog: temp_add, interests: temp_delete, filtered_catalog: temp_filter};
		});
	}

	render() {
		var header_txt, placeholder_txt, dest = "";
		var btn_label = 'next';
		var user_type = parse(this.props.location.search).user_type;
		var url_arr = this.props.location.pathname.split('/');

		if (url_arr[1] === 'lab-skills') {
			header_txt = "Necessary Lab Skills";
			dest = 'lab-specifications';
			placeholder_txt = "Skills used to work in your lab";
		}
		else {
			if (user_type === "faculty") {
				header_txt = "Your Lab Labels";
				placeholder_txt = "descriptors for your lab work";
			}
			else (user_type === "student") {
				header_txt = "Your Interests";
				placeholder_txt = "field of interest";
			}

			switch(url_arr[1]) {
				case "pick-your-interests":
					switch(user_type) {
						case "faculty":
							dest = 'lab-skills';
							break;
						case "student":
							dest = 'past-research';
					}
					break;
				case "update-interests":
					btn_label = "back";
					switch(user_type) {
						case "faculty":
							dest = 'prof-page';
							break;
						case "student":
							dest = 'student-profile';
					}
			}
	
		}

		let temporary = "default";
		if (document.getElementById('lab-name')) {
			let len = document.getElementById('lab-name').value.length;
			if (len != 0) {
				temporary = document.getElementById('lab-name').value;
			}
		}
		return(
			<div className='pick-your-interests shift-down container center-align'>
				<div className='row interest-container'>
					<div className='interest-section col s6 left-align'>
						<input id='lab-name' className='interest-search' type='text' placeholder={placeholder_txt} onChange={this.filterList} />
						<div className='interest-body'>
							{this.state.filtered_catalog.map((interest) => {
								return (<span key={interest} onClick={this.handleClickAdd.bind(this, interest, temporary)} > <Bubble txt={interest} type='adder' /> </span>)
							})}
						</div>
					</div>

					<div className='interest-section col s6'>
						<div className='interest-header'>
							{header_txt}
						</div>
						<div className='interest-body'>
							{this.state.interests.map((interest) => {
								return (<span key={interest} onClick={this.handleClickDelete.bind(this, interest, temporary)}> <Bubble txt={interest} type='deleter' /> </span>)
							})}
						</div>
					</div>
				</div>
				<SquareButton destination={dest} label={btn_label}/>
			</div>
		);
	}
}

export default PickYourInterests;