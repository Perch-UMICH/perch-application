import React, {Component} from 'react';
import $ from 'jquery';
import SquareButton from './SquareButton';
import SubmissionModal from './SubmissionModal';
import './ModalButton.css';

class ModalButton extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
    onClick(event) {
        $('#submitModal').fadeIn("slow");
        $('#modalBackdrop').fadeIn("slow");
    }
    render() {
        return (
            <div>
            	<div id="modalBackdrop"></div>
            	<p onClick={this.onClick}><SquareButton label='submit'/></p>
            	<SubmissionModal />
            </div>
        );
    }
}

export default ModalButton;