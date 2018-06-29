import React, {Component} from 'react';
import './ExpanderIcons.css'

/*
    id: (REQUIRED) base value for component, will automatically append "-expand-icons" to make unique. Used for toggling
    classBase: (OPTIONAL) base name for generic className, will automatically append "-expand-icons", use for styling
    action: function to be called when clicked

    When sytling, name your id or class selectors you plug in with "-expand-icons"

    Example: <ExpanderIcons id='group-page' classBase='group-page' action={this.expandDescription.bind(this)}/>
*/
class ExpanderIcons extends Component {
	expandDescription() {
        let toggleExpanderIcons = () => {
            let expanderIcons = document.getElementById(`${this.props.id}-expand-icons`)
            for (let i = 0; i < expanderIcons.children.length; i++)
                expanderIcons.children[i].innerText = (expanderIcons.children[i].innerText == 'expand_more') ? 'expand_less' : 'expand_more';
            expanderIcons.classList.toggle('active-blue')
        }
        toggleExpanderIcons();
        this.props.action();
    }

	render() {
		return(
			<div id={`${this.props.id}-expand-icons`} className={`${this.props.classBase}-expand-icons expand-icons`} onClick={this.expandDescription.bind(this)}>
                <i className='material-icons'>expand_more</i>
                <i className='material-icons'>expand_more</i>
                <i className='material-icons'>expand_more</i>
            </div>	
		)
	}
}

export default ExpanderIcons;