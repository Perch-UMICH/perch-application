import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './PerchStory.css';
import story from '../data/perchStoryData'
import $ from 'jquery'

class PerchStory extends Component {

	constructor(props) {
		super(props)
		this.left = 1;
		this.lshift = 130 + 20;
		this.rshift = 130 + 120;
	}

	render() {
		return (
			<div className="perch-story">
			<div className='perch-story-header shadow'>The Perch Story</div>
				{
					story.map((item ) => {
						if (this.left) {
							this.left = 0;
							let shift = this.lshift;
							this.lshift += 270;
							return <div className='perch-story-block-L shadow' style={{top: `${shift}px`}}>{item}</div>
						}
						else {
							this.left = 1;
							let shift = this.rshift;
							this.rshift += 320;
							return <div className='perch-story-block-R shadow' style={{top: `${shift}px`}}>{item}</div>
						}
					})
				}
			</div>

		);
	}
}

export default PerchStory;