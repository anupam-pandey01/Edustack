import React from 'react'
import "./Hero.css"
import { Link } from "react-router"
const Hero = () => {
  return (
    <div className='hero-section'>
      <div className="hero-head">
        <h1>Learn Without Limits</h1>
        <h1>100% Free Courses for Everyone</h1>
        <p>Access quality lessons, quizzes, and resources at no cost. start learning today and build your future</p>
        <Link to={"/course-list"}><button className="search-button">Explore now</button></Link>
      </div>
      <div className='input-section' >
        <input type="text" placeholder='Enter the course name' name='course' />
        <button>Search</button>
      </div>
    </div>
  )
}

export default Hero
