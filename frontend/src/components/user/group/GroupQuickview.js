import React, {Component} from 'react';
import './GroupQuickview.css'

class GroupQuickview extends Component {

	expandDescription() {
        let toggleExpanderIcons = () => {
            let expanderIcons = document.getElementById(`group-page-expand-icons`)
            for (let i = 0; i < expanderIcons.children.length; i++)
                expanderIcons.children[i].innerText = (expanderIcons.children[i].innerText == 'expand_more') ? 'expand_less' : 'expand_more';
            expanderIcons.classList.toggle('active-blue')
        }
        toggleExpanderIcons();
        alert('todo')
    }

	render() {
		return(
			<div id='group-page-quickview'>
				<img src='https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/NGTYhyRhgilq4uu1a/videoblocks-doodle-cartoon-animation-of-science-chemistry-physics-astronomy-and-biology-school-education-subject-used-for-presenation-title-in-4k-ultra-hd_sl2xqduzw_thumbnail-full12.png' id='group-page-coverimage' />
				<div id='group-page-name'>Dr. Jone's Chemistry Lab</div>
				<div id='group-page-description'>Our laboratory is very interested in understanding the functional and organizational patterns underlying complex systems with our major emphasis being on protein interactions and the role of post-translational modifications in controlling those interactions.  We rely primarily on mass spectrometry and protein chemistry techniques to address problems in these areas.</div>
				<div id='group-page-expand-icons' onClick={this.expandDescription.bind(this)}>
                    <i className='material-icons'>expand_more</i>
                    <i className='material-icons'>expand_more</i>
                    <i className='material-icons'>expand_more</i>
                </div>
			</div>		
		)
	}
}

export default GroupQuickview;