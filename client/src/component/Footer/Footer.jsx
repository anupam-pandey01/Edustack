import React from 'react'
import "./Footer.css"
import logo from "../../assets/logo.svg"
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="logo-section">
        <Link to={`/`} className='footer-logo'>
            <img src={logo} alt="" />
            <h1>EduStack</h1>
        </Link>
        <p>EduStack is a free learning platform built to empower students, professionals, and lifelong learners. With interactive courses, a supportive community, and easy access to resources, EduStack makes quality education accessible to everyone—anytime, anywhere.</p>
      </div>
      <div className="about-platform">
        <ul>
            
            <Link to="/"><li>Home</li></Link>
            <Link to="/about-us"><li>About us</li></Link>
            <Link to="/contact-us"><li>Contact us</li></Link>
            <Link to="/privacy-policy"><li>Privacy policy</li></Link>
        </ul>
      </div>
      <div className="feedback-section">
        <p>Please leave a feedback for us</p>
        <textarea type="text" placeholder='Feedback here...' />
        <Link to="/review"><button>Feedback</button></Link>
      </div>
      
    </div>
  )
}

export default Footer
