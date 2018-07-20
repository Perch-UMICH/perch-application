import React, {Component} from 'react';
import ExpanderIcons from '../../utilities/ExpanderIcons'
import './GroupQuickview.css'

class GroupQuickview extends Component {

	expandDescription() {
        document.getElementById('group-page-description').classList.toggle('expand')
    }

	render() {
		return(
			<div id='group-page-quickview'>
				<img src='https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/NGTYhyRhgilq4uu1a/videoblocks-doodle-cartoon-animation-of-science-chemistry-physics-astronomy-and-biology-school-education-subject-used-for-presenation-title-in-4k-ultra-hd_sl2xqduzw_thumbnail-full12.png' id='group-page-coverimage' />
				<div id='group-page-name'>{this.props.title}</div>
				<div id='group-page-description'>{this.props.description}Bacon ipsum dolor amet pork kevin chuck ribeye pig. Frankfurter tri-tip flank meatball biltong capicola alcatra tenderloin porchetta meatloaf chuck cow landjaeger turducken. Cupim shoulder kevin, brisket t-bone leberkas tenderloin jowl corned beef boudin andouille swine pork belly kielbasa. Jerky pig tri-tip shank flank turkey kielbasa alcatra pork loin landjaeger. Beef ribs shankle short ribs, swine shoulder t-bone chicken ball tip. Jerky shoulder ball tip andouille, hamburger meatloaf capicola sausage. </div>
				<ExpanderIcons id='group-page' action={this.expandDescription.bind(this)}/>
			</div>		
		)
	}
}

export default GroupQuickview;