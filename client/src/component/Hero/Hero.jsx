import React, { useState } from 'react'
import "./Hero.css"
import { Link, useNavigate } from "react-router"

const Hero = () => {
  const [ searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();

  function handleSearch(){
    navigate(`/course-list?search=${searchQuery}`)
  }
  
  return (
    <div className='hero-section'>
      <div className="hero-head">
        <h1>Learn Without Limits</h1>
        <h1>100% Free Courses for Everyone</h1>
        <p>Access quality lessons, quizzes, and resources at no cost. start learning today and build your future</p>
        <Link to={"/course-list"}><button className="search-button">Explore now</button></Link>
      </div>
      <div className='input-section' >
        <input type="text" placeholder='Enter the course name' name='course' onChange={(e)=> setSearchQuery(e.target.value)}/>
        <button onClick={()=>handleSearch()}>Search</button>
      </div>
    </div>
  )
}

export default Hero
