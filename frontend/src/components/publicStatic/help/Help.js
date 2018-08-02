import React, {Component} from 'react';
import './Help.css';


class Help extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'Making a Student Account',
			vid: 'test.mov'
		}
	}

	activate(title, vid) {
		this.setState({
			active: title,
			vid: vid,
		})
	}

	componentDidUpdate() {
		console.log(this.state)
	}

	render() {
		return(
			  <div id='help'>
			  	<div className='perch-story-header'>Tutorials</div>
			  	<div id='help-video-wrapper'>
			  		<video src={`/vids/${this.state.vid}`} controls/>
			  	</div>
			  	<div id='vid-panel'>
			  		<h1>We got your back</h1>
			  		<VidItem title='Making a Student Account' 				vid='test.mov' superClick={this.activate.bind(this)} active={this.state.active} />
			  		<VidItem title='Making a Professor Account' 			vid='test2.mov' superClick={this.activate.bind(this)} active={this.state.active}/>
			  		<VidItem title='Editing Info' 							vid='test.mov' superClick={this.activate.bind(this)} active={this.state.active}/>
			  		<VidItem title='Using the ProjectBook' 					vid='test.mov' superClick={this.activate.bind(this)} active={this.state.active}/>
			  		<VidItem title='Applying to a project' 					vid='test.mov' superClick={this.activate.bind(this)} active={this.state.active}/>
			  		<VidItem title='Best ways to communicate with faculty' 	vid='test.mov' superClick={this.activate.bind(this)} active={this.state.active}/>
			  		<VidItem title='Join the Team' 							vid='test.mov' superClick={this.activate.bind(this)} active={this.state.active}/>
			  	</div>
			  </div>
		);
	}
}

class VidItem extends Component {

	render() {
		return(
			<div onClick={() => this.props.superClick(this.props.title, this.props.vid)} className={`vid-item ${this.props.title === this.props.active ? 'active-vid' : ''}`}>
				{this.props.title}
			</div>
		)
	}
}

export default Help;