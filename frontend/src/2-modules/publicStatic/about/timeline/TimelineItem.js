import React, {Component} from 'react';
class TimelineItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fadeIn: null,
			hideLink: ' hide'
		};

		// Determine FadeLeft or FadeRight
		if (props.fadeIn === 'L')
			this.state.fadeIn = 'js--fadeInLeft';
		else 
			this.state.fadeIn = 'js--fadeInRight';

		// Hides link if no link label 
		if (props.linkLabel) {
			this.state.hideLink = '';
		}
	}

	render() {
		return (
			<div className="timeline-item">
		    	<div className="timeline-img"></div>
		        <div className={"timeline-content timeline-card " + this.state.fadeIn} >
		          	<div className="timeline-img-header">
		            	<h2>{this.props.header}</h2>
		          	</div>
		          	<div className="date">{this.props.date}</div>
		          	<p>{this.props.description}<br /></p>
		     	  	<a className={"bnt-more time-a" + this.state.hideLink} target="_blank" href={this.props.linkRef}>{this.props.linkLabel}<br /><br /></a>
		        </div>
		     </div> 
		);
	}
}

export default TimelineItem;