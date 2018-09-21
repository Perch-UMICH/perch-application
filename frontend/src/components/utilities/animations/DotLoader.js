import React, {Component} from 'react';
import './DotLoader.css'

const DotLoader = (props) => {
  return (
    <div className="dot-loader-wrapper">
      <div className="dot-loader-container">
        <div className="dot dot-one"/>
        <div className="dot dot-two"/>
        <div className="dot dot-three"/>
      </div>
    </div>
  )
}

export default DotLoader;
