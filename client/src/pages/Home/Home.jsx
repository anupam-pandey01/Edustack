import React from 'react'
import "./Home.css"
import Hero from '../../component/Hero/Hero'
import KeyBenefit from '../../component/KeyBenefit/KeyBenefit'
const Home = () => {
  return (
    <div className='home'>
      <Hero/>
      <KeyBenefit/>
    </div>
  )
}

export default Home
