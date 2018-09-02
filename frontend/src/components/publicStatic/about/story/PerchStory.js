import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './PerchStory.css';
import story from '../../../../data/perchStoryData'
import $ from 'jquery'

import {getAllLabs} from '../../../../helper.js'

class PerchStory extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		let text = story.map((item) => {
			return(
				<div className='perch-story-block'>
					<img src={item.img}/>
					<div dangerouslySetInnerHTML={{__html: item.text}} />
				</div>
			)
		})
		return (
			<div className="perch-story">
				<div className='perch-story-header'>The Perch Story</div>
				<div>{text}</div>
			</div>

		);
	}
}

export default PerchStory;