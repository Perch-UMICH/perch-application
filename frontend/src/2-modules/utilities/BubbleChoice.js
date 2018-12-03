import React, {Component} from 'react';
import Bubble from './Bubble';
import {getAllTags, getAllSkills, getCurrentStudentId, createSkill, createTag, getStudentSkills, getStudentTags} from '../../helper.js';
import '../user/individual/PickYourInterests.scss';

class BubbleChoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options_full: [], // Full options to choose from.
			options: [], // Filtered options.
			chosen: [], // Student choices.
		}
		this.passChosen.bind(this)
	}

	componentDidMount() { // Load initial options & choices.
		let getChoices = this.props.skills ? getStudentSkills : getStudentTags
		let getOptions = this.props.skills ? getAllSkills : getAllTags
		let id = getCurrentStudentId();

		getChoices(id).then(r => {
			let chosen = (r.data && r.data.length) ? r.data : []

			getOptions(id).then(r2 => {
				let options_full = (r2.data && r2.data.length) ? r2.data : []
				let options = options_full.filter(e => {
					return (chosen.map(c => { return c.id; }).indexOf(e.id) == -1)})
				this.setState({chosen, options, options_full})
			})
		})
	}

	clickAdd(b) { // Remove bubble from options and add to chosen.
		let b_idx = this.state.options.map(o => { return o.id; }).indexOf(b.id)
		let options = this.state.options
		let chosen = this.state.chosen

		options.splice(b_idx, 1)
		chosen.push(b)

		this.setState({options, chosen})
		this.passChosen(chosen)
	}

	clickDelete(b) { // Remove bubble from options and add to chosen.
		let b_idx = this.state.chosen.map(c => { return c.id; }).indexOf(b.id)
		let chosen = this.state.chosen
		let options = this.state.options

		chosen.splice(b_idx, 1)
		options.push(b)

		this.setState({options, chosen})
		this.passChosen(chosen)
	}

	clickCustomAdd() { // Add new skill/interest with custom adder.
		let createBubble = this.props.skills ? createSkill : createTag
		let options_full = this.state.options_full
		let chosen = this.state.chosen

		// Can uncomment on backend update - returns 'Error: skill of this name already exists' for any value
		// createBubble(this.state.search_val || "", "").then(r => {
		// 		console.log("r",r)
		// 		options_full.push(r.data)
		// 		chosen.push(r.data)
		// 		this.setState({options_full, options})
		// 		this.passChosen(chosen)
		// })
	}

	passChosen(chosen) { // Update parent with new choices.
		if (this.props.passChosen) 
			this.props.passChosen(chosen, this.props.skills)
	}

	filterList(e) { // Using search box, filter options.
    	let options = this.state.options_full.filter(o => {
			let matches_search = o.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
				e.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
			return (matches_search && (this.state.chosen.map(c => { return c.id; }).indexOf(o.id) == -1))
		})
		this.setState({options, search_val: e.target.value})
	}

	render() {
		let placeholder = this.props.skills ? "search skills" : "search interests"
		let header = this.props.skills ? "Your Skills" : "Your Interests"

		return(
			<div className='row interest-container'>
				<div className='interest-section left col s6 left-align'>
					{/*<div className="interest-custom-add" onClick={this.clickCustomAdd.bind(this)}>+ custom</div>*/}
					<input id='search-term' className='interest-search' type='text' placeholder={placeholder} onChange={this.filterList.bind(this)} />
					<div className='interest-body'>
						{this.state.options.map((o, idx) => {
							return ( <div key={`op_${idx}`} onClick={this.clickAdd.bind(this, o)}><Bubble txt={o.name} type="adder" /></div> )
						})}
					</div>
				</div>

				<div className='interest-section right col s6'>
					<div className='interest-header'>{header}</div>
					<div className='interest-body'>
						{this.state.chosen.map((c, idx) => {
							return ( <div key={`ch_${idx}`} onClick={this.clickDelete.bind(this, c)}><Bubble txt={c.name} type="deleter" /></div> )
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default BubbleChoice;