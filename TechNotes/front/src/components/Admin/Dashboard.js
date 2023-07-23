import React from 'react';
import CurrentDateTime from '../CurrentDateTime';
import Navbar from '../Navbar'; 
import '../Navbar.css'
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='dash-div'>
      <Navbar />
      <div className='dash-container'>
        <hr></hr>
      <CurrentDateTime />
      <hr></hr>
      <h4 style={{"color":"#000","marginBottom":"15px"}}>Welcome Back</h4>
      <br/>
      <div className='dash-links'>
      <Link to="/view-notes">View TechNotes</Link>
      <Link to="/add-note">Add New TechNotes</Link>
      <Link to="/view-users">View User Setting</Link>
      <Link to="/add-user">Add New User</Link>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
