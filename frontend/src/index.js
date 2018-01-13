import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Typed from 'typed.js';
import './materialize.css'
import './style2.css'

import Router from './routes.js'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<Router />
	), document.getElementById('root'));
registerServiceWorker();

// var options = {
//   strings: ["Research", "Finding a lab", "Finding lab assistants", "Learning lab skills", "Making an impact", "Research"],
//   typeSpeed: 65
// }

// var typed = new Typed(".element", options);
// var typed = new Typed(".element-mobile", options);