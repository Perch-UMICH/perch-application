import React, {Component} from 'react';
import CountdownTimer from './CountdownTimer.js';
import TimelineItem from './TimelineItem.js';
import './Timeline.css';
import $ from 'jquery'
import ScrollReveal from 'scrollreveal';

class Timeline extends Component {

	componentDidMount() {

		$(function(){

		  window.sr = ScrollReveal();

		  if ($(window).width() < 768) {

		    if ($('.timeline-content').hasClass('js--fadeInLeft')) {
		      $('.timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
		    }

		    window.sr.reveal('.js--fadeInRight', {
		      origin: 'right',
		      distance: '300px',
		      easing: 'ease-in-out',
		      duration: 800,
		    });

		  } else {
		    
		    window.sr.reveal('.js--fadeInLeft', {
		      origin: 'left',
		      distance: '300px',
		      easing: 'ease-in-out',
		      duration: 800,
		    });

		    window.sr.reveal('.js--fadeInRight', {
		      origin: 'right',
		      distance: '300px',
		      easing: 'ease-in-out',
		      duration: 800,
		    });

		  }
		  
		  window.sr.reveal('.js--fadeInLeft', {
		      origin: 'left',
		      distance: '300px',
		      easing: 'ease-in-out',
		      duration: 800,
		    });

		    window.sr.reveal('.js--fadeInRight', {
		      origin: 'right',
		      distance: '300px',
		      easing: 'ease-in-out',
		      duration: 800,
		    });
		});
	}

	render() {
		return (
			<div>
				{/*<CountdownTimer />*/}
				<section className="timeline">
				    <div className="container">
					  	<TimelineItem 
					  		header='Jo Angela Oehrli' 
				  			date='19 NOV 2017' 
				  			description='Jo Angela Oehrli, published UM librarian, joins the team as a primary advisor' 
				  			linkLabel='TODO'
				  			fadeIn='L'
				  		/>

				  		<TimelineItem 
					  		header='U of M Library Minigrant' 
				  			date='24 SEP 2017' 
				  			description='Perch wins the University of Michigan library Student Mini-Grant Award' 
				  			linkLabel='TODO'
				  			fadeIn='R'
				  		/>

				  		<TimelineItem 
					  		header='Splash Page Deployed' 
				  			date='27 OCT 2017' 
				  			description='Splash page goes online, including basic platform functionality' 
				  			linkLabel='TODO'
				  			fadeIn='L'
				  		/>

				  		<TimelineItem 
					  		header='Mascot Designed' 
				  			date='29 OCT 2017' 
				  			description='Perch mascot, Rodriguez, developed by graphic design team' 
				  			linkLabel='TODO'
				  			fadeIn='R'

				  		/> 

				  		<TimelineItem 
					  		header='Jim Bennett' 
				  			date='23 AUG 2017' 
				  			description='Jim Bennett, Microsoft Product lead, joins the team at a primary advisor' 
				  			linkLabel='TODO'
				  			fadeIn='L'
				  		/> 

				  		<TimelineItem 
					  		header='Wireframe' 
				  			date='1 SEP 2016' 
				  			description='Perch wireframe prototype showcased at Optimize prototype night' 
				  			linkLabel='WIREFRAME' 
				  			linkRef='https://xd.adobe.com/view/7b2ab11b-723d-4340-af58-ae50727bb6ad/'
				  			fadeIn='R'
				  		/> 

				  		<TimelineItem 
					  		header='Optimize Challenge' 
				  			date='24 FEB 2017' 
				  			description='Perch receives Optimize Social Innovation Challenge grant, with our own Akira and Hyejin becoming Optimize fellows' 
				  			linkLabel='OPTIMIZE' 
				  			linkRef='https://www.optimizemi.org/'
				  			fadeIn='L'
				  		/> 

				  		<TimelineItem 
					  		header='John Wolfe' 
				  			date='19 AUG 2016' 
				  			description='Professor John Wolfe, Arthur F. Thurnau Professor of Chemistry, joins the team as a primary advisor' 
				  			linkLabel='JOHN WOLFE' 
				  			linkRef='http://www.umich.edu/~wolfelab/wolfe.html'
				  			fadeIn='R'
				  		/> 
				         
				 	</div>
				</section>
			</div>
		);
	}
}

export default Timeline;