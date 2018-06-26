import React, {Component} from 'react';
import './LabSearchItem.css';

class LabSearchItem extends Component {

	render() {
		return (
            <div className='lab-srch-item'> 
                <img src='/img/meha.jpg' className='lab-srch-item-pic' />
                <div className='lab-srch-item-name'>Meha Patel</div>
                <div className='lab-srch-item-depts'><b>Departments:</b> physics, chemistry</div>
                <div className='lab-srch-item-rsrch'><b>Research Areas:</b> Nuclear Coffee Science, nanoparticles</div>
                <div className='lab-srch-item-description'><b>Description</b> Woah, we do some cool shit in this lab. You should join! We make coffee, smell cofee, drink coffee, freeze coffee, sublimate coffee, distill cofee, and watch cofee.</div>
                <div className='lab-srch-item-apply'>Apply</div>
            </div>
		);
	}
}

export default LabSearchItem;