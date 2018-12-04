import React, {Component} from 'react';
import './Editor.css'

// Put this at the end of a componenet to get an edit icon (or add icon) in the top right
// href prop is the link it should go to
// TODO add a certification check attrbute
class Editor extends Component {

	action() {
		if (this.props.href) {
			window.location.href = this.props.href;
		}
		else if (this.props.superClick) {
			this.props.superClick();
		}
	}

	render() {
		if (!this.props.permissions) return null;

		var icon = <i className="fas fa-pencil-alt"></i>
		if (this.props.add) {
			icon = <i className="material-icons">add</i>
		}
		return(
			<div className='editor' onClick={this.action.bind(this)}>{icon}</div>
		);
	}
}

export default Editor;
