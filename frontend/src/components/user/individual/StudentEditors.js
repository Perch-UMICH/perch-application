import React, {Component} from 'react';
import BasicButton from '../../utilities/buttons/BasicButton'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import './StudentEditors.css';

export class EditLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			linkedin_link: props.user && props.user.linkedin_link ? props.user.linkedin_link : '',
			website_link: props.user && props.user.website_link ? props.user.website_link : '',
		}
	}

	render() {
		return (
			<div>
				<div className='input-field'>
					<input type='text' id='linkedin' placeholder='Rodriguez@linkedin.com' value={this.state.linkedin_link}
					onChange={(e) => {
						if (this.props.updateUser) {
							this.props.updateUser("linkedin_link", e.target.value); }
						this.setState({linkedin_link: e.target.value})}}/>
					<label htmlFor='linkedin' className="active" >Linkedin</label>
				</div>
				<div className='input-field'>
					<input type='text' id='resume' placeholder='super-cool-resume.pdf' value={this.state.website_link}
					onChange={(e) => {
						if (this.props.updateUser) {
							this.props.updateUser("website_link", e.target.value); }
						this.setState({website_link: e.target.value})}}/>
					<label htmlFor='resume' className="active" >Resume</label>
				</div>
				{this.props.prof &&
					<div className='input-field'>
						<input type='text' id='lab-materials' placeholder='lab-materials.pdf' value={this.state.lab_materials_link}
						onChange={(e) => {
							if (this.props.updateUser) {
								this.props.updateUser("lab_materials_link", e.target.value); }
							this.setState({lab_materials_link: e.target.value})}}/>
						<label htmlFor='lab-materials' className="active">Lab Materials</label>
					</div>
				}
			</div>
		)
	}
}


// Example
export const Test = () => (
	<EditContainer title='Experience Info'><EditContact /></EditContainer>
)

// Generic container for when needed as standalone component
export let EditContainer = (props) => (
	<div id='edit-container'>
		<h1>Edit {props.title}</h1>
		{props.children}
		<BasicButton msg='return'/>
	</div>
)

// Generic container for holding onboarding editors
export let EditContainerOnboarding = (props) => (
	<div id='edit-container'>
		<h1>Add {props.title}</h1>
		{props.children}
		{/*<BasicButton msg='next' superClick={props.redirect}/>*/}
	</div>
)

// Content, flexible to other containres
export class EditContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: props.user && props.user.email ?  props.user.email : '',
			phone: props.user && props.user.phone ? props.user.phone : '',
		}
	}

	render() {
		return(
			<form id='edit-contact-info'>
				<div className='input-field'>
					<input type='text' id='phone-number' placeholder='815-262-4141' value={this.state.phone}
					onChange={(e) => {
						if (this.props.updateUser) {
							this.props.updateUser("phone", e.target.value); }
						this.setState({phone: e.target.value})}}/>
					<label htmlFor='phone-number' className="active">Phone</label>
				</div>
				<div className='input-field'>
					<input id='email' type='email' placeholder='bearb@umich.edu' value={this.state.email}
					onChange={(e) => {
						if (this.props.updateUser) {
							this.props.updateUser("email", e.target.value); }
						this.setState({email: e.target.value})}}/>
					<label htmlFor='email' className="active">Email</label>
				</div>
			</form>
		)
	}
}

export class EditBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Short description of background, experience, and interests",
			bio: this.props.user && this.props.user.bio ? this.props.user.bio : '',
		}
	}

	componentWillReceiveProps(props) {
		if (props.user && props.user.bio) {
			this.setState({bio: props.user.bio})
		}
	}

	render() {
		return(
			<form id='edit-bio'>
				<div className='input-field'>
					<textarea id='textArea' placeholder='Short description of background, experience, and interests'
					onChange={(e) => {
						if (this.props.updateUser) {
							this.props.updateUser("bio", e.target.value);}
						this.setState({bio: e.target.value})}}>
					{this.state.bio}</textarea>
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
		var initObjs = [{
			id: 'o_0',
			title: '',
			timeRange: '',
			text: '',
		}];
		if (props.type === 'work' && props.user && props.user.experience) {
			initObjs = props.user.experience;
		}
		if (props.type === 'educ' && props.user && props.user.education) {
			initObjs = props.user.education;
		}
		this.state = {
			objs: initObjs,
			titleText, titlePlacehold, textPlacehold
		}
		this.state.index = this.state.objs.length;
	}

	addObj(event) {
		var newObj = {
			id: 'o_' + this.state.index,
			title: '',
			start_date: '',
			end_date: '',
			description: '',
		};
		var newIndex = this.state.index + 1;
		var updated_objs = this.state.objs.concat([newObj]);
		this.setState({
			objs: updated_objs,
			index: newIndex,
		});
		if (this.props.updateUser) {
			if (this.props.type === "work") {
				this.props.updateUser("experience", updated_objs);
			} else {
				this.props.updateUser("education", updated_objs);
			}
		}
	}

	alterObj(event, id) {
		var temp_objs = this.state.objs;
		var index = temp_objs.findIndex(item => item.id === id);
		temp_objs[index][event.target.name] = event.target.value;
		this.setState({
			objs: temp_objs,
		});
		if (this.props.updateUser) {
			if (this.props.type === "work") {
				this.props.updateUser("experience", temp_objs);
			} else {
				this.props.updateUser("education", temp_objs);
			}
		}
	}

	removeObj(id) {
		this.setState((prevState) => {
			var temp_objs = prevState.objs;
			var removeIndex = temp_objs.map(function(item) { return item.id; }).indexOf(id);
			temp_objs.splice(removeIndex, 1);
			if (this.props.updateUser) {
				if (this.props.type === "work") {
					this.props.updateUser("experience", temp_objs);
				} else {
					this.props.updateUser("education", temp_objs);
				}
			}
			return {
				objs: temp_objs,
			};
		});
	}

	render() {
		return(
			<form id='edit-experience'>
			  {this.state.objs.map((obj) => {
					return (
						<div key={obj.id}>
							<div className="row">
								<div className="col s11">
									<div className='input-field'>
										<input id='title' type='text' name="title" placeholder={this.state.titlePlacehold} value={obj.title} onChange={(e) => this.alterObj(e, obj.id)}/>
										<label htmlFor='title' className="active">{this.state.titleText}</label>
									</div>
									<div className='input-field col s5'>
										<input id='start_date' type='text' name="start_date" placeholder='August 2017' value={obj.start_date} onChange={(e) => this.alterObj(e, obj.id)}/>
										<label htmlFor='start_date' className="active">Start Date</label>
									</div>
									<div className='input-field col s5'>
										<input id='end_date' type='text' name="end_date" placeholder='April 2018' value={obj.end_date} onChange={(e) => this.alterObj(e, obj.id)}/>
										<label htmlFor='end_date' className="active">End Date</label>
									</div>
									<textarea id={obj.id} type="text" placeholder={this.state.textPlacehold} className="textarea-experience"
										name="description" value={obj.text} onChange={e => this.alterObj(e, obj.id)} required></textarea>
								</div>
								<div className="col s1">
									<a id={obj.id} onClick={() => this.removeObj(obj.id)}><i className="material-icons remove-obj experience-remove">clear</i></a>
								</div>
							</div>
							<div className="edit-experience-hr" />
						</div>)
				})}
				<div className="add-obj-icon-container">
					<a onClick={this.addObj.bind(this)}><i className="material-icons add-obj-icon">add</i></a>
				</div>
			</form>
		)
	}
}


export class EditQuickview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: props.user && props.user.img ? props.user.img : props.img,
			rotate: 0,
			scale: 1.5,
			name: props.user && props.user.name ? props.user.name : "",
			school: props.user && props.user.school ? props.user.school : "",
		}
	}

	handleDrop = dropped => {
		this.setState({ image: dropped[0] })
		if (this.props.updateUser) {
			this.props.updateUser("img", dropped[0]);
		}
	}

	handleSlider = e => {
		this.setState({
			scale: e.target.value
		})
		if (this.props.updateUser) {
			this.props.updateUser("img_scale", e.target.value);
		}
	}

	handleRotate = () => {
		this.setState({rotate: this.state.rotate - 90}, () => {
			if (this.props.updateUser) {
				this.props.updateUser("img_rotate", this.state.rotate);
			}
		})
	}

	componentDidUpdate() {
		console.log(this.state.scale)
	}

	render() {
		return(
			<div className="quickview-editor-container">
				<div id='quickview-editor-L'>
					<Dropzone
				        onDrop={this.handleDrop}
				        disableClick
				        style={{ width: '250px', height: '250px' }}
				      >
						<AvatarEditor
					        image={this.state.image}
					        width={200}
					        height={200}
					        border={20}
					        color={[0, 0, 0, 0.2]}
					        scale={this.state.scale}
					        rotate={this.state.rotate}
					        className='grabbable'/>
					</Dropzone>
					<i>Drag and drop image</i>
					<div id='prof-pic-editors'>
				     	<div className='range-field'>
				     		<input type="range" id="profile-pic-range" min="1" max="5" step='0.1' defaultValue='1.5' onChange={this.handleSlider}/>
				    	</div>
				    	<i id='rotate-icon' className='material-icons' onClick={this.handleRotate}>rotate_90_degrees_ccw</i>
				   </div>
			    </div>
			   	<div id='quickview-editor-R'>
			   		<div className='input-field'>
			   			<input id='profile-name' type='text' placeholder='Rodriguez Happypants' value={this.state.name}
							 	onChange={(e) => {
									if (this.props.updateUser) {
										this.props.updateUser("name", e.target.value)}
									this.setState({name: e.target.value})
								}}/>
			   			<label htmlFor='profile-name' className="active" >Name</label>
			   		</div>
			   		<div className='input-field'>
			   			<input id='profile-school' type='text' placeholder='Hogwarts' value={this.state.school}
								onChange={(e) => {
									if (this.props.updateUser) {
										this.props.updateUser("school", e.target.value)}
									this.setState({school: e.target.value})
								}}/>
			   			<label htmlFor='profile-school' className="active" >School</label>
			   		</div>
			   	</div>
			</div>
		)
	}
}
