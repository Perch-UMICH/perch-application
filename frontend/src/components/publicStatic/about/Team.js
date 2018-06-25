import React, { Component } from 'react';
import './Team.css';
import Card from './Card.js';
import TableCard from '../../utilities/TableCard.js';
import {getMemberData} from '../../../data/memberData';

// initialize member mapping
var memberBySlug = {};

getMemberData().map(member => {
  memberBySlug[member.slug] = member;
});

const subteams = [ "Mascot Division", "Biology", "Web Development", "Chemistry", 
                   "Social Sciences", "Engineering", "Business" ];

/* All 7 subteams denoted as t0-6 as ordered above.
   Member slugs may be added into these slots below:
*/

// 1 member - Rodriguez!
const t0 = ['rodriguez'] 

// 4 members max
const t1 = ['jzhang', 'jzhang', 'jzhang', 'jzhang']

// 4 members max
const t2 = ['smccarthy', 'smccarthy', 'smccarthy', 'smccarthy']

// 18 members max
const t3 = ['hwang', 'hwang', 'hwang', 'hwang', 'hwang', 'hwang',
                  'hwang', 'hwang', 'hwang', 'hwang', 'hwang', 'hwang',
                  'hwang', 'hwang', 'hwang', 'hwang', 'hwang', 'hwang', ]

 // 7 members max
const t4 = ['sbalijepalli', 'sbalijepalli', 'sbalijepalli', 'sbalijepalli',
            'sbalijepalli', 'sbalijepalli', 'sbalijepalli']

// 5 members max
const t5 = ['salektiar', 'salektiar', 'salektiar', 'salektiar', 'salektiar']

// 5 members max
const t6 = ['mpatel', 'mpatel', 'mpatel', 'mpatel', 'mpatel']

const teamsMap = {t0, t1, t2, t3, t4, t5, t6}
var teamMemIdx = {
  t0: 0,  t1: 0,  t2: 0,  t3: 0,  t4: 0,  t5: 0,  t6: 0,
}

   // rows [0  1  2  3  4  5  6  7  8  9  10 11]
const r0 = [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6];
const r1 = [1, 2, 9, 9, 9, 9, 9, 9, 4, 5, 5, 6];
const r2 = [1, 2, 3, 3, 3, 3, 3, 3, 4, 5, 5, 6];
const r3 = [1, 2, 3, 3, 3, 3, 3, 3, 4, 4, 5, 6];
const r4 = [1, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 6];

const tableBones = [r0, r1, r2, r3, r4];

var cardTable = [ [], [], [], [], [] ];

console.log("memberBySlug", memberBySlug);

for (var i = 0; i < 5; ++i) {
  for (var j = 0; j < 12; ++j) {

    var teamNum = tableBones[i][j];
    var key = `${i}_${j}`;

    if (teamNum !== 9) {
      var curIdx = teamMemIdx[`t${teamNum}`];
      var member = memberBySlug[teamsMap[`t${teamNum}`][curIdx]];
      teamMemIdx[`t${teamNum}`] += 1;
      cardTable[i].push(
        <TableCard 
          key={key}
          member={member}
          team={`t${teamNum}`} />
      )
    } else {
      cardTable[i].push(
        <div key={key} className="card-placehold"></div>
      )
    }

  }
}


class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {

    var perchiodicTable = 
      cardTable.map((cardRow, idx1) => {
        return (
          <div className="row justify-content-around table-row">
            { cardRow.map((card, idx2) => {
              return (
                <div 
                  key={`${idx1}_${idx2}`} 
                  className="col-1 table-card-container">
                  {card}
                </div>
              )
            })}
          </div>
        )
      })

    var keyColOne =
      <div className="col-6 key-item">
        <div className="key-item">
          <div className="key-title">By Primary Subteam</div>
        </div>
        { subteams.map((subteamName, idx) => {
          var tileCSS = `key-tile t${idx}-tccbg`;
          if (idx < 3) {
            return (
              <div className="key-item">
                <div className={tileCSS}></div> 
                <div className="key-item-text">{subteamName}</div>
              </div>
            )}
        })}
      </div>

    var keyColTwo =
      <div className="col-6 key-item">
        { subteams.map((subteamName, idx) => {
          var tileCSS = `key-tile t${idx}-tccbg`;
          if (idx >= 3) {
            return (
              <div className="key-item">
                <div className={tileCSS}></div> 
                <div className="key-item-text">{subteamName}</div>
              </div>
            )}
        })}
      </div>

    return (
      <div>
        <div className="perchiodic-table-title">
          The Perchiodic Table
        </div>
        <div className="perchiodic-table-key">
          <div className="row justify-content-around">
            <div className="col-6 key-col">
              {keyColOne}
            </div>
            <div className="col-6 key-col">
              {keyColTwo}
            </div>
          </div>
        </div>
        <div className="periodic-table-container">
          {perchiodicTable}
        </div>

        <div className="team">
        </div>
      </div>
      
    );
  }
}

export default Team;
