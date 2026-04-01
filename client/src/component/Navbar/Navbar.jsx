import React, { useState } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router'
import userIcon from "../../assets/userIcon.png"
import { useAuth } from '../../AuthContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, currentUser, isLoggedIn, loading } = useAuth();

  function handleButton(){
    navigate("/auth")
  }


  return (
    <div className='navbar'>
      <div className='brand-group'>
        <Link to={`/`} className='brand'>
          <img src={logo} alt="" className='logo'/>
          <span>EduStack</span>
        </Link>
        
      </div>
      { loading ? null : ( isLoggedIn ? 
        <div className="navbar-profile">
          <div>
            <img src={userIcon} alt="icon" className='user-logo' />
            <div className="dropdown">
              <Link to={`/educator/${currentUser}`}><p className='dropdown-dashboard' >Dashboard</p></Link>
              <Link to={`/enrollment/${currentUser}`}><p className='dropdown-enroll' >My Enrollment</p></Link>
              <p onClick={ () => logout() } className='dropdown-logout'>Log out</p>
            </div>
          </div>   
        </div>

      : <button onClick={handleButton}>Create a account</button> )}
    </div>
  )
}

export default Navbar
