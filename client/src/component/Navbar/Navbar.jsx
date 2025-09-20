import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router'
import userIcon from "../../assets/userIcon.png"
import { useAuth } from '../../AuthContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, setCurrentUser, setIsLoggedIn} = useAuth();

  function handleLogout(){
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  }

  function handleButton(){
    navigate("/auth")
  }
  return (
    <div className='navbar'>
      <Link to={"/"} className='brand'>
        <img src={logo} alt="" className='logo'/>
        <span>EduStack</span>
      </Link>
      
      { isLoggedIn ? 
        <div className="navbar-profile">
          <Link to={`educator/${currentUser}`}>Be a Instructor</Link> 
          <p>||</p>
          <p>My Enrollments</p>
          <div >
            <img src={userIcon} alt="icon" className='user-logo' />
            <div className="dropdown">
              <p onClick={ handleLogout }>Log out</p>
            </div>
          </div>
          
        </div>

      : <button onClick={handleButton}>Create a account</button> }
    </div>
  )
}

export default Navbar
