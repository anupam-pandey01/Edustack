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
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
        </ul>
      </div>
      <div className="feedback-section">
        <p>Please leave a feedback for us</p>
        <textarea type="text" placeholder='Feedback here...' />
        <button>Feedback</button>
      </div>
      
    </div>
  )
}

export default Footer
