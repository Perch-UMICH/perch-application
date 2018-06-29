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

const subteams = [ "Mascot Division", "Director", "Administration", "Marketing",
                   "Back-End Web Dev", "Front-End Web Dev", "Graphics", "Business",
                    "Psychology/Sociology", "Chemical Engineering", "Chemistry", "Biology",
                    "Perch Blog"];

/* All 7 subteams denoted as t0-6 as ordered above.
   Member slugs may be added into these slots below:
*/

// Mascot
const t0 = ['rodriguez']

// Director
const t1 = ['anishii']

// Administration
const t2 = ['nkataoka']

// Marketing
const t3 = ['mpatel', 'hpark']

 // Back-end
const t4 = ['arao', 'hwang']

// Front-end
const t5 = ['bbear', 'ejackson', 'ckaczmarek', 'rnayak']

// Graphics
const t6 = ['kjohnson']

// Business
const t7 = ['vdoddipatla', 'aappukutty', 'rvaishnav', 'asatyavarapu']

// Psychology/Sociology
const t8 = ['kglozier', 'kniles', 'kmartin']

// Chemical Engineering
const t9 = ['ikopyeva', 'sbutrus', 'vraman', 'amin', 'adesai',
             'abanka', 'cpalaciosrolston', 'eprantzalos', 'ekhera', 'jtan',
             'kgreenman', 'lchen']

// Chemistry
const t10 = ['salektiar', 'jzhang', 'jmanske', 'mkuang', 'smccarthy', 'wni']

// Biology
const t11 = ['sbalijepalli', 'agirgis', 'kmckernan', 'njasti',
            'nbidthanapally', 'rkathawate']

// Perch Blog
const t12 = ['rtarnopol']

const teamsMap = {t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12}
var teamMemIdx = {
  t0: 0,  t1: 0,  t2: 0,  t3: 0,  t4: 0,  t5: 0,  t6: 0, t7: 0,  t8: 0,  t9: 0,  t10: 0,  t11: 0,  t12: 0,
}

   // rows [0   1   2   3   4   5   6   7   8   9  10  11]
const r0 = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  7];
const r1 = [1,  5, -1, -1, -1, -1, -1, -1, 11, 10, 10,  7];
const r2 = [2,  5,  4,  9,  9,  9,  9,  8, 11, 10, 10,  7];
const r3 = [3,  5,  4,  9,  9,  9,  9,  8, 11, 11, 10,  7];
const r4 = [3,  5,  6,  9,  9,  9,  9,  8, 11, 11, 10, 12];

const tableBones = [r0, r1, r2, r3, r4];

var cardTable = [ [], [], [], [], [] ];

console.log("memberBySlug", memberBySlug);

for (var i = 0; i < 5; ++i) {
  for (var j = 0; j < 12; ++j) {

    var teamNum = tableBones[i][j];
    var key = `${i}_${j}`;

    if (teamNum !== -1) {
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
          <div key={`${idx1}hm`} className="row justify-content-around table-row">
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
      <div className="key-col">
        <div className="key-item">
          <div className="key-title">The Per<span style={{color: 'var(--active-blue)'}}>{"{ch}"}</span>iodic Table</div>
        </div>
        { subteams.map((subteamName, idx) => {
          var tileCSS = `key-tile t${idx}-tccbg`;
          if (idx < 4) {
            return (
              <div key={idx} className="key-item">
                <div className={tileCSS}></div>
                <div className="key-item-text">{subteamName}</div>
              </div>
            )}
        })}
      </div>

    var keyColTwo =
      <div className="key-col">
        { subteams.map((subteamName, idx) => {
          var tileCSS = `key-tile t${idx}-tccbg`;
          if (idx >= 4 && idx < 8) {
            return (
              <div key={idx} className="key-item">
                <div className={tileCSS}></div>
                <div className="key-item-text">{subteamName}</div>
              </div>
            )}
        })}
      </div>

    var keyColThree =
      <div className="key-col">
        { subteams.map((subteamName, idx) => {
          var tileCSS = `key-tile t${idx}-tccbg`;
          if (idx >= 8) {
            return (
              <div key={idx} className="key-item">
                <div className={tileCSS}></div>
                <div className="key-item-text">{subteamName}</div>
              </div>
            )}
        })}
      </div>

    return (
      <div>
        <div className="perchiodic-table-key">
          {keyColOne}
          {keyColTwo}
          {keyColThree}
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
