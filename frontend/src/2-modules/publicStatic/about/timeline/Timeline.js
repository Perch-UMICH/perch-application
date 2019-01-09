import React, { Component } from 'react'
import CountdownTimer from './CountdownTimer.js'
import TimelineItem from './TimelineItem.js'
import './Timeline.css'
import $ from 'jquery'
import ScrollReveal from 'scrollreveal'

class Timeline extends Component {
  componentDidMount () {
    $(function () {
      window.sr = ScrollReveal()

      if ($(window).width() < 768) {
        if ($('.timeline-content').hasClass('js--fadeInLeft')) {
          $('.timeline-content')
            .removeClass('js--fadeInLeft')
            .addClass('js--fadeInRight')
        }

        window.sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800
        })
      } else {
        window.sr.reveal('.js--fadeInLeft', {
          origin: 'left',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800
        })

        window.sr.reveal('.js--fadeInRight', {
          origin: 'right',
          distance: '300px',
          easing: 'ease-in-out',
          duration: 800
        })
      }

      window.sr.reveal('.js--fadeInLeft', {
        origin: 'left',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800
      })

      window.sr.reveal('.js--fadeInRight', {
        origin: 'right',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800
      })
    })
  }

  render () {
    return (
      <div>
        <div className='perch-story-header'>Timeline</div>
        <section className='timeline'>
          <div className='container'>
            <TimelineItem
              header='UROP'
              date='MAY 2018'
              description='Perch collaborates with the UM Undergraduate Research Opportunities Program (UROP)'
              linkLabel='UROP'
              linkRef='https://lsa.umich.edu/urop'
              fadeIn='L'
            />

            <TimelineItem
              header='Additional Classes'
              date='APR 2018'
              description='Perch begins working with the UM Chemical Engineering (Prof. Sharon Glotzer, Chair) and Molecular and Cellular Biology (Prof. Robert Denver, Chair) departments to offer a classes for the Winter 2019 semester'
              linkLabel='CHEMICAL ENGINEERING DEPARTMENT'
              linkRef='https://che.engin.umich.edu/'
              fadeIn='R'
            />

            <TimelineItem
              header='First Course Offered'
              date='MAR 2018'
              description='Perch collaborates with the University of Michigan Chemistry Department to offer a class, CHEM 211H, in the Fall 2018 semester'
              linkLabel='CHEMISTRY COURSE CATALOG'
              linkRef='https://webapps.lsa.umich.edu/CrsMaint/Public/CB_PublicBulletin.aspx?crselevel=UG&subject=CHEM'
              fadeIn='L'
            />

            <TimelineItem
              header='Michigan Library Blog Post'
              date='26 FEB 2018'
              description="Perch's progress is recognized by the University of Michigan Library blogs"
              linkLabel='MICHIGAN LIBRARY BLOGS'
              linkRef='https://www.lib.umich.edu/blogs/student-stories/student-mini-grants-perch-equalizing-stem-research-opportunities'
              fadeIn='R'
            />

            <TimelineItem
              header='Student Startup Madness'
              date='16 JAN 2018'
              description='Perch is recognized as one of the top 32 college startups by the Student Startup Madness Competition'
              linkLabel='STUDENT STARTUP MADNESS'
              linkRef='http://studentstartupmadness.com/2018-field-of-32-in-student-startup-madness-college-entrepreneurship-tournament-announced/?utm_source=Field+of+64&utm_campaign=e2df9380a9-64_Announcement_2017_2018__1_4_2018+-+faculty&utm_medium=email&utm_term=0_94e4d11fd8-e2df9380a9-559801057'
              fadeIn='L'
            />

            <TimelineItem
              header='Jo Angela Oehrli'
              date='19 NOV 2017'
              description='Jo Angela Oehrli, published UM librarian, joins the team as a primary advisor'
              linkLabel='TODO'
              fadeIn='R'
            />

            <TimelineItem
              header='Michigan Business Challenge'
              date='11 NOV 2017'
              description='Perch qualifies for Round One of the Michigan Business Challenge'
              linkLabel='MICHIGAN BUSINESS CHALLENGE'
              linkRef='http://zli.umich.edu/programs-funds/michigan-business-challenge'
              fadeIn='L'
            />

            <TimelineItem
              header='Innovation in Action'
              date='9 NOV 2017'
              description='Perch participates in the Innovation in Action Education Challenge'
              linkLabel='INNOVATION IN ACTION'
              linkRef='http://innovationinaction.umich.edu/teams/current-teams.html'
              fadeIn='R'
            />

            <TimelineItem
              header='Mascot Designed'
              date='29 OCT 2017'
              description='Perch mascot, Rodriguez, developed by graphic design team'
              linkLabel='TODO'
              fadeIn='L'
            />

            <TimelineItem
              header='Splash Page Deployed'
              date='27 OCT 2017'
              description='Splash page goes online, including basic platform functionality'
              linkLabel='TODO'
              fadeIn='R'
            />

            <TimelineItem
              header='U of M Library Minigrant'
              date='24 SEP 2017'
              description='Perch wins the University of Michigan library Student Mini-Grant Award'
              linkLabel='TODO'
              fadeIn='L'
            />

            <TimelineItem
              header='Jim Bennett'
              date='23 AUG 2017'
              description='Jim Bennett, Microsoft Product lead, joins the team at a primary advisor'
              linkLabel='TODO'
              fadeIn='R'
            />

            <TimelineItem
              header='The Middle Road'
              date='23 JUN 2017'
              description='Perch is featured in The Middle Road blog under an early name, M-STEP'
              linkLabel='THE MIDDLE ROAD'
              linkRef='https://themiddleroad.org/2017/06/23/social-impact-entrepreneurship-umich-optimize-it-the-best-way-part-1/#more-4481'
              fadeIn='L'
            />

            <TimelineItem
              header='Optimize Challenge'
              date='24 FEB 2017'
              description='Perch receives Optimize Social Innovation Challenge grant, with our own Akira and Hyejin become Optimize fellows'
              linkLabel='OPTIMIZE'
              linkRef='https://www.optimizemi.org/'
              fadeIn='R'
            />

            <TimelineItem
              header='Wireframe'
              date='1 SEP 2016'
              description='Perch wireframe prototype showcased at Optimize prototype night'
              linkLabel='WIREFRAME'
              linkRef='https://xd.adobe.com/view/7b2ab11b-723d-4340-af58-ae50727bb6ad/'
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
    )
  }
}

export default Timeline
