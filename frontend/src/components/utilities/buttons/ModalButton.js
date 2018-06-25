import React, {Component} from 'react';
import $ from 'jquery';
import BasicButton from './BasicButton';
import AppSubmissionModal from '../../utilities/modals/AppSubmissionModal';
import AppCreationModal from '../../utilities/modals/AppCreationModal';
import './ModalButton.css';

class ModalButton extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
    onClick(event) {
        $('#submitModal').fadeIn("slow");
        $('#createModal').fadeIn("slow");
        $('#modalBackdrop').fadeIn("slow");
    }
    render() {
        return (
            <div>
            	<div id="modalBackdrop"></div>
                {/*<p onClick={this.onClick}><SquareButton label={this.props.label} /></p>*/}
            	<p onClick={this.onClick}><BasicButton color='light' msg={this.props.label} /></p>
                {this.props.type === "create_app" ? <AppCreationModal info={this.props.info}/> : null }
            	{this.props.type === "submit_app" ? <AppSubmissionModal /> : null }
            </div>
        );
    }
}

export default ModalButton;