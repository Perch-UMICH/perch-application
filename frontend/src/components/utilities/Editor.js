import React, {Component} from 'react';
import './Editor.css'

// Put this at the end of a componenet to get an edit icon in the top right
// href prop is the link it should go to
// TODO add a certification check attrbute
class Editor extends Component {
	action() {
		window.location.href = this.props.href;
	}

	render() {
		return(
			<div className='editor' onClick={this.action.bind(this)}><i class="fas fa-pencil-alt"></i></div>
		);
	}
}

export default Editor;
