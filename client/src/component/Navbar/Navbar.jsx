import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate();
  function handleButton(){
    navigate("/auth")
  }
  return (
    <div className='navbar'>
      <Link to={"/"} className='brand'>
        <img src={logo} alt="" className='logo'/>
        <span>EduStack</span>
      </Link>
      <button onClick={handleButton}>Create a account</button>
    </div>
  )
}

export default Navbar
