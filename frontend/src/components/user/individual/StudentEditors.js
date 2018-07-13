import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import './StudentEditors.css';


export class EditBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bio: 'Four score and seven years ago',
		}
	}
	render() {
		return(
			<div id='edit-container'>
				<form id='edit-bio'>
					<h1>Edit Bio</h1>
					<textarea placeholder='Four score and seven years ago ... ' onChange={(bio) => this.setState({bio: bio})}>{this.state.bio}</textarea>
				</form>
				<BasicButton msg='return'/>
			</div>
		)
	}
}

// Example
export const Test = () => (
	<EditContainer title='Contact Info'><EditContact /></EditContainer>
)

// Generic container for when needed as standalone component
export let EditContainer = (props) => (
	<div id='edit-container'>
		<h1>Edit {props.title}</h1>
		{props.children}
		<BasicButton msg='return'/>
	</div>
)

// Content, flexible to other containres
export class EditContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: 'bearb@umich.edu',
			phone: '815-276-4124',
		}
	}
	render() {
		return(
			<form id='edit-contact-info'>
				<div className='input-field'>
					<input type='text' id='phone-number' placeholder='815-262-4141' value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
					<label htmlFor='phone-number'>Phone</label>
				</div>
				<div className='input-field'>
					<input id='email' type='email' placeholder='bearb@umich.edu' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
					<label htmlFor='email'>Email</label>
				</div>
			</form>
		)
	}
}

// Experience Editor, for both Work Experience and Education editing.
// Pass in 'work' or 'educ' to 'type' prop to set proper text.
export class EditExperience extends Component {
	constructor(props) {
		super(props);
		var titleText = props.type === 'work' ? 'Title' : 'School Name';
		var titlePlacehold = props.type === 'work' ? "Dr. Labby's Lab" : 'University of Michigan';
		var textPlacehold = props.type === 'work' ? 'Decribe your role' : 'Undergraduate Degree in Biology ...';
		this.state = {
			objs: [{
				id: 'o_0',
				title: '',
				timeRange: '',
				text: '',
			}],
			titleText, titlePlacehold, textPlacehold
		}
		this.state.index = this.state.objs.length;
	}

	addObj(event) {
		var id = 'o_' + this.state.index;
		var title = '';
		var text = '';
		var timeRange = '';
		var newObj = {
			id,
			title,
			timeRange,
			text,
		};
		var newIndex = this.state.index + 1;
		var updated_objs = this.state.objs.concat([newObj]);
		this.setState({
			objs: updated_objs,
			index: newIndex,
		});
	}

	alterObj(event, id) {
		var temp_objs = this.state.objs;
		var index = temp_objs.findIndex(item => item.id === id);
		temp_objs[index][event.target.name] = event.target.value;
		this.setState({
			objs: temp_objs,
		});
	}

	removeObj(id) {
		this.setState((prevState) => {
			var temp_objs = prevState.objs;
			var removeIndex = temp_objs.map(function(item) { return item.id; }).indexOf(id);
			temp_objs.splice(removeIndex, 1);
			return {
				objs: temp_objs,
			};
		});
	}

	render() {
		return(
			<form id='edit-contact-info'>
			  {this.state.objs.map((obj) => {
					return (
						<div className="row" key={obj.id}>
							<div className="col s11">
								<div className='input-field'>
									<input id='title' type='text' name="title" placeholder={this.state.titlePlacehold} value={obj.title} onChange={(e) => this.alterObj(e, obj.id)}/>
									<label htmlFor='title'>{this.state.titleText}</label>
								</div>
								<div className='input-field'>
									<input id='timeRange' type='text' name="timeRange" placeholder='August 2017 - April 2018' value={obj.timeRange} onChange={(e) => this.alterObj(e, obj.id)}/>
									<label htmlFor='timeRange'>Time Range</label>
								</div>
								<textarea id={obj.id} type="text" placeholder={this.state.textPlacehold} id="class-input" name="text" value={obj.text} onChange={e => this.alterObj(e, obj.id)} required></textarea>
							</div>
							<div className="col s1">
								<a id={obj.id} onClick={() => this.removeObj(obj.id)}><i className="material-icons">clear</i></a>
							</div>
						</div>)
				})}
				<div className="add-obj-icon-container">
					<a onClick={this.addObj.bind(this)}><i className="material-icons add-obj-icon">add</i></a>
				</div>
			</form>
		)
	}
}
