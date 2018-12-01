import React, {Component} from 'react';
import './RodriguezLoader.css'

const RodriguezLoader = (props) => {
  return (
    <div className="rodriguez-wrapper">
      <div className="rodriguez-container">
        <img className="armless-body" src="/assets/PERCH_MASCOT_ARMLESS.svg"/>
        <img className="right-arm" src="/assets/MASCOT_RIGHT_ARM.svg"/>
        <img className="left-arm" src="/assets/MASCOT_LEFT_ARM.svg"/>
      </div>
    </div>
  )
}

export default RodriguezLoader;
