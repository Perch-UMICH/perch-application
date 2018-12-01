import React from 'react';
import './ProgressIndicator.css'

const ProgressIndicator = (props) => {

  var steps = props.steps ? props.steps : 0;
  var curStep = props.curStep ? props.curStep : 0;
  var circles = [];
  for (var i = 0; i < steps; ++i) {
    var circleCSS = "indicator-circle";
    // 1-indexing for steps
    if (i <= curStep) {
      circleCSS += "-on";
    }
    circles.push(<div className={circleCSS} key={`${i}_ind`}></div>)
  }

  return (
    <div className={props.containerCSS}>
      {circles}
    </div>);
}

export default ProgressIndicator;
