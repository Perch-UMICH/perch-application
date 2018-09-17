import React, {Component} from 'react';
import './Challenge.css';
import Typed from 'typed.js'
import Prism from 'prismjs';
import axios from 'axios'

class Challenge extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        let options = {
          strings: ["challenge", "challenge of awesome", "fiesta", "primer", "puzzle"],
          typeSpeed: 70,
          loop: true,
        }
        let typed = new Typed("#challenge-word", options);
        axios.get('https://perchresearch.com:3000/api/challenge_project_data').then(r => console.log(r))
    }

    render () {
        let header = <div id='challenge-title'>Coding <span id='challenge-word'></span></div>

let code = `
/* 
    Hi future react developers! 
    Here's a challenge to help us see your skills 
    and get you up to speed with some of the baseline 
    web-dev skills you'd use on our team.
*/

const EMAIL = 'info@perchresearch.com'
const INSTRUCTIONS = [
                        'Each level builds on the previous one.',
                        'Go as far as you can',
                        'and submit your code as a tar to our email.'
                    ]
                    
const DUE_DATE = new Date('September 30, 2018')

let levelOne = 'Make a single view react app showing one lab and its data'
let levelTwo = 'Make a single view react app with our api showing a lab list'
let levelThree = 'Make a two view react app with the lab list page linking to lab views (hint: React-router)'
let bonus = 'add a javascript fuzzy search to the lab list'

startChallenge().then(readDocs)
                .then(absorbKnowledge)
                .then(becomeReactMaster)

alert('Good Luck')

`

let apiData = {
   "id": 99,
   "title": "Perch Research Web Development",
   "description": "Help develop the Perch Research web app, which will be used to organize university lab projects from UROP and (in the future) across many universities. Will involve programming in React (Javascript), and PHP",
   "duties": "Attend weekly web development meetings and work sessions. Work with other web development members on different coding assignments on the frontend and backend of thes site",
   "time_commitment": 8,
   "classification": "Software Development"
}
        return (
            <div id='challenge'>
                {header}
                <pre>
                    <code className="language-javascript">
                        {code}
                    </code>
                </pre>
                <div className='challenge-title'>Here's our API</div>
                <div>
                    <pre>
                        <code className="language-javascript">
                            {`
`}
                            /* This is the format request of one object. For level one, just copy and paste this as an object into your code */
                            {`
`}
                            {JSON.stringify(apiData, undefined, 2)}
{`

/* 
    For Level 2 and above, you're going to need to interact with our API,
    which contains an array of data as objects in the format above, 
    along with metadata
*/
    axios.get('https://perchresearch.com:3000/api/challenge_project_data').then(d => doStuff(d))

`}
                        </code>
                    </pre>
                </div>
                <div className='challenge-title'>Here's some resources to help</div>
                <div><a href='https://reactjs.org/docs/hello-world.html'>React Documentation</a></div>
                <div><a href='https://reacttraining.com/react-router/'>React Router Documentation</a></div>
                <div><a href='https://css-tricks.com/almanac/'>CSS tricks</a></div>
                <div><a href='https://github.com/axios/axios'>Axios Docs</a></div>
                <br />
            </div> 
        );
    }
}

export default Challenge;