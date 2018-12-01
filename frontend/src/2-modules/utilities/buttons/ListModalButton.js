import React, {Component} from 'react';
import $ from 'jquery';
import BasicButton from './BasicButton';
import AppDisplayModal from '../modals/AppDisplayModal';
import './ModalButton.css';

class ListModalButton extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
    onClick(event) {
        $("#displayModal" + this.props.info.slug).fadeIn("slow");
        $("#modalBackdrop").fadeIn("slow");
    }
    render() {
        return (
            <div>
            	<p onClick={this.onClick}><BasicButton msg="view minion" /></p>
                <AppDisplayModal info={this.props.info}/>
            </div>
        );
    }
}

export default ListModalButton;