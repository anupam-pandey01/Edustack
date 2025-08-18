import React from 'react'
import lamp from "../../assets/lamp.png"
import computer from "../../assets/computer.png"
import growth from "../../assets/growth.png"
import "./KeyBenefit.css"

const KeyBenefit = () => {
  return (
    <div className="card-container"> 
        <h1>Key Benefits</h1>
        <p>Why Choose Our Platform?</p>
        <p>Empowering every learner with tools to succeed — anytime, anywhere, for free</p>
        <div className='key-benefit-section'> 
        <div className='key-benefit'>
            <img src={lamp} alt="" />
            <h2>Free for Everyone</h2>
            <p>Access 100% free courses with no hidden money</p>
        </div>

        <div className='key-benefit'>
            <img src={growth} alt="" />
            <h2>Track Your Progress</h2>
            <p>Stay motivated with progress tracking and completion badge</p>
        </div>

        <div className='key-benefit'>
            <img src={computer} alt="" />
            <h2>Learn Anytime, Anywhere</h2>
            <p>Study on any device, at own place</p>
        </div>
        </div>
    </div>
  )
}

export default KeyBenefit
