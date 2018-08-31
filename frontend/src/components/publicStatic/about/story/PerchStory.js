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

	componentDidMount() {
		let verify = (resp) => {
			console.log(`retrieved ${Object.keys(resp.data).length} labs`)
		}
		getAllLabs(1)
		.then(verify)
		.then(()=>getAllLabs(1))
		.then(verify)
	}

	render() {
		return (
			<div className="perch-story">
			<div className='perch-story-header'>The Perch Story</div>
				{
					story.map((item ) => {
						return <div className='perch-story-block-L' dangerouslySetInnerHTML={{__html: item}}></div>
					})
				}
			</div>

		);
	}
}

export default PerchStory;