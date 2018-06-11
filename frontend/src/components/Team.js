import React, { Component } from 'react';
import './Team.css';
import Card from './Card.js';
import TeamPhoto from './TeamPhoto.js';
import Greeting from './Greeting.js';

const members = [
  {
    firstName: "Akira",
    lastName: "Nishii",
    position: "Executive Director",
    bio: []
  },
  {
    firstName: "Nolan",
    lastName: "Kataoka",
    position: "Head of Marketing",
    bio: []
  },
  {
    firstName: "Akshay",
    lastName: "Rao",
    position: "Head of Back End Development",
    bio: [
    "Meha is a Junior studying Cellular and Molecular Biology",
    "She lives by the saying: if you want to save a life become a doctor, but if you want to save lives become a scientist"
    ]
  },
  {
    firstName: "Benji",
    lastName: "Bear",
    position: "Head of Front End Development",
    bio: []
  },
  {
    firstName: "Meha",
    lastName: "Patel",
    position: "Head of Administration",
    bio: []
  },
  {
    firstName: "Sara",
    lastName: "Alektiar",
    position: "Head of Chemistry Team",
    bio: []
  },
  {
    firstName: "Sanjay",
    lastName: "Balijepalli",
    position: "Head of Biology Team",
    bio: []
  },
  {
    firstName: "Han",
    lastName: "Wang",
    position: "Back End Development",
    bio: []
  },
  {
    firstName: "Sean",
    lastName: "McCarthy",
    position: "Chemistry Team",
    bio: []
  },
  {
    firstName: "Jessica",
    lastName: "Zhang",
    position: "Chemistry Team",
    bio: []
  },
  {
    firstName: "Alex",
    lastName: "Girgis",
    position: "Biology Team",
    bio: []
  }
];

const memberCards = members.map(function(member) {
            return <Card key={member.firstName}
            firstName={member.firstName} 
            lastName={member.lastName} 
            img={`img/${member.firstName}.jpg`.toLowerCase()} 
            position={member.position} 
            bio={member.bio} 
            />;
          });

class Team extends Component {
  render() {
    return (
      <div>
        {/*<TeamPhoto />*/}
        <div className="team">
          {/*<Greeting message="Meet the Perch Team"/>*/}
          <div id='team-box' className="container row">
            {memberCards}
          </div>
        </div>
      </div>
      
    );
  }
}

export default Team;
