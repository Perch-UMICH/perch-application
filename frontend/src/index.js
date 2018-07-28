import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
	<Router />
	), document.getElementById('root'));
registerServiceWorker();
