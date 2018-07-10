/*
Modal for profile edit components; usage:

1) Pass relevant props:
	id, title, actionName (name for action button, default = "save"),
	modalAction (function to call on action button click).
	Pass child component as usual! (e.g. <EditModal ... ><Child/></EditModal>)

2) Add the following line of code to the parent component return:
	<div id="greyBackdrop" className="modal-backdrop"></div>

	Create & call handler in parent adding 'activated' classes to open, e.g. ...
	openEditModal() {
		document.getElementById( *id* ).classList.add('activated');
		document.getElementById("greyBackdrop").classList.add('activated');
	}
*/

import React, {Component} from 'react';
import BasicButton from '../buttons/BasicButton';

class EditModal extends Component {

	handleClose(event) {
    document.getElementById(this.props.id).classList.remove('activated');
    document.getElementById("greyBackdrop").classList.remove('activated');
	}

	render() {
		return(
			<div>
				<div id={this.props.id} className="modal modal-fixed-footer display-modal">
					<h1>{this.props.title}</h1>
			 		<div className="modal-content">
						{this.props.children}
          </div>
          <div className="modal-footer">
				     	<BasicButton superClick={this.handleClose.bind(this)} msg='close' />
				     	<BasicButton
								superClick={this.props.modalAction}
								msg={this.props.actionName ? this.props.actionName : "save"} />
				  	</div>
			 	</div>
			</div>
		);
	}
}

export default EditModal;
