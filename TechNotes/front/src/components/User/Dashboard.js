import React from 'react';
import CurrentDateTime from '../CurrentDateTime';
import Navbar from '../Navbar'; 
import '../Navbar.css'
import { Link } from 'react-router-dom';

function DashboardEmployee() {
  return (
    <div className='dash-div'>
      <Navbar />
      <div className='dash-container'>
      <hr></hr>
      <CurrentDateTime />
      <hr></hr>
      <h4 style={{"color":"#000","marginBottom":"15px"}}>Welcome Back</h4>
      <div className='dash-links'>
      <Link to="/view-user-notes">View TechNotes</Link>
      <Link to="/add-user-note">Add New TechNotes</Link>
      </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
