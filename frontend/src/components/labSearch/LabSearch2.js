import React, {Component} from 'react';
// import './LabSearch.css';
import './LabSearch2.css';
import ExpanderIcons from '../utilities/ExpanderIcons'
// import Bubble from '../utilities/Bubble';
// import LabList from './LabList';
import LabSearchItem from './LabSearchItem';

import '../user/individual/PickYourInterests.css';
import {getAllLabs, getLabTags, isLoggedIn, getCurrentUserId, getStudentFromUser, getAllSkills, getAllTags, getStudentSkills, getStudentTags, getUser, getSearchData} from '../../helper.js'
import {getFilters} from '../../data/filterData';

const filterTypes = ['departments', 'researchAreas', 'minReqs', 'lab-skills'];
const filterFriendlyNames = ['Departments', 'Research Areas', 'Minimum Requirements', 'Lab Skills'];

class LabSearch extends Component {
	constructor(props) {
		super(props);
		this.handleFilterClick = this.handleFilterClick.bind(this);

		var filts = {};
		var parentFilts = {}
		filterTypes.map(type => {
			filts[type] = {};
			parentFilts[type] = [];
			// getFilters(type).map(filt => {
			// 	if (!filt.isSubFilt) {
			// 		parentFilts[type].push(filt);
			// 	}
			//   filts[type][filt.slug] = filt;
			// })
		})

		this.state = {
			filts,
			parentFilts,
			skills_catalog: [],
			your_skills: [],
			interests_catalog: [],
			your_interests: [],
			skills: [],
			interests: [],
			filtered_catalog: [],
			in_filter: false,
			search_skills: true,
			search_interests: false,
			all_labs: [],
			filtered_labs: [],
			s_id: '',
            search: '',
		}
	}

    componentWillMount() {
        getSearchData().then((resp) => {
            //console.log(resp);
            let new_filts = this.state.filts;
            let new_parentFilts = this.state.parentFilts;

            resp.all_commitments.map((req) => {
                new_filts['minReqs'][req] = {friendlyName: req, slug: req};
                new_parentFilts['minReqs'].push({friendlyName: req, slug: req});
            });

            resp.available_skills.map((skill) => {
                new_filts['lab-skills'][skill] = {friendlyName: skill, slug: skill};
                new_parentFilts['lab-skills'].push({friendlyName: skill, slug: skill});
            });

            resp.available_areas.map((area) => {
                new_filts['researchAreas'][area] = {friendlyName: area, slug: area};
                new_parentFilts['researchAreas'].push({friendlyName: area, slug: area});
            });

            resp.available_departments.map((dept) => {
                new_filts['departments'][dept] = {friendlyName: dept, slug: dept};
                new_parentFilts['departments'].push({friendlyName: dept, slug: dept});
            });

            this.setState({filts: new_filts, parentFilts: new_parentFilts});
            //console.log(this.state.filts);
            //console.log(this.state.parentFilts);
        });

    }

	expand(type) {
		document.getElementById(`${type}-filter`).classList.toggle('expand')
	}

	filterList(event) {
		if (this.state.search_skills) {
			var updatedList = this.state.skills_catalog;
		}
		else {
			var updatedList = this.state.interests_catalog;
		}
    	updatedList = updatedList.filter(function(item){
      	return item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").search(
        	event.target.value.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")) !== -1;
    	});
    	this.setState({filtered_catalog: updatedList, in_filter: true});
	}

	handleFilterClick(filterType, slug) {
		var newState = this.state;
		if (newState.filts[filterType][slug].clicked) {
			newState.filts[filterType][slug].clicked = false;
		} else {
			newState.filts[filterType][slug].clicked = true;
		}
		this.setState(newState);
	}

	closeModifiers() {
		document.getElementById('lab-search-box').classList.add('hide');
	}

    updateSearch(event) {
        this.setState({search: event.target.value})
    }

	render() {
		var filterContentArr = [];
		filterTypes.map(type => {
			var filterContent =
				<ul className = "search-filter-content">
					{this.state.parentFilts[type].map((filt) => {
						var subFiltSection = null;
						if (this.state.filts[type][filt.slug].clicked &&
								filt.subFilts && filt.subFilts.length > 0) {

							subFiltSection =
								<ul className="subfilter">
									{filt.subFilts.map((subFiltSlug) => {
										var subFilt = this.state.filts[type][subFiltSlug];
										return (
											<li key={subFilt.slug}>
												<input type="checkbox"
													className="checkbox-white filled-in"
													id={subFilt.slug}/>
												<label
													className="filter-checkbox-label"
													for={subFilt.slug}>
													{subFilt.friendlyName}
												</label>
											</li>)})}
								</ul>
						}
						var labelContent = null;
						if (filt.subFilts && filt.subFilts.length > 0) {
							var expandCSS = this.state.filts[type][filt.slug].clicked ?
								"search-expand-less" : "search-expand-more";
							labelContent =
								<li key={filt.slug}>
									<div className="filter-dropdown-container">
										<a className={expandCSS}
											 onClick={() => this.handleFilterClick(type, filt.slug)}
											 id={filt.slug}>
												<i className="material-icons">
													{this.state.filts[type][filt.slug].clicked ?
														"expand_less" : "expand_more"}
												</i>
											</a>
										<div className="filter-dropdown-label">{filt.friendlyName}</div>
									</div>
									{subFiltSection}
								</li>
						}
						else {
							labelContent =
								<li key={filt.slug}>
									<input type="checkbox"
										className="checkbox-white filled-in"
										id={filt.slug}/>
									<label
										className="filter-checkbox-label"
										for={filt.slug}>{filt.friendlyName}</label>
								</li>
						}
						return (labelContent);
					})}
				</ul>

				filterContentArr.push(<div className="search-filter-content-wrapper">
					{filterContent}</div>);
		})

	var searchSideBar =
		<div className="search-sidebar">
			{filterTypes.map((type, idx) => {
				return (
					<div id={`${type}-filter`} className="search-filter-container">
						<div className="search-filter-title">{filterFriendlyNames[idx]}</div>
						<ExpanderIcons id={`${type}-filter`} classBase='search-filter-container' action={() => {this.expand(type)}} filterDropdown={true}/>
						<hr className="filter-hr"/>
						{filterContentArr[idx]}
					</div>
				)
			})}
		</div>
		return (
			<div className='lab-srch-2'>
               <div className='lab-srch-mods'>
                   {searchSideBar}
               </div>
               <div className='lab-srch-body'>
                   <input id='lab-srch-input' type='text' placeholder='keywords' onChange={event => this.updateSearch(event)}/>
                   <div id='lab-srch-result-summary'>Projects 1-50 (157 total) page 1 of 40 for <b>{this.state.search}</b></div>
                   <div id='lab-srch-results'>
                        <LabSearchItem name="Meha Patel's Lab" dept='English' rsrch='12th century grammar analysis' img='/img/meha.jpg' description='We love words. Especially old, hard to understand words.'/>
                        <LabSearchItem name='Sara Alektar' dept='Physics' rsrch='nuclear coffee decay' img='/img/sara.jpg' description="We make coffee, smell cofee, drink coffee, freeze coffee, sublimate coffee, distill cofee, and watch cofee. You should join!"/>
                        <LabSearchItem name='Sanjay B.' dept='Chemistry' rsrch='chromatography race betting' img='/img/sanjay.jpg' description='If the school asks, this does not exist.'/>
                        <LabSearchItem name='Nolan Kataoka' dept='Dance' rsrch='expressive feet dance' img='/img/nolan.jpg' description='We strongly feel feet are the window to the soul'/>
                   </div>
                   <div id='lab-srch-more' onClick={()=>{alert('load em')}}>Mo' labs, mo' problems</div>
               </div>
			</div>
		);
	}
}

export default LabSearch;
