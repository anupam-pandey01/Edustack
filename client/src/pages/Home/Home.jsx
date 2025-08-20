import React, { useState } from 'react'
import "./Home.css"
import { Rating } from "react-simple-star-rating"
import Hero from '../../component/Hero/Hero'
import KeyBenefit from '../../component/KeyBenefit/KeyBenefit'
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.jpg"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import Testimonial from '../../component/Testimonial/Testimonial'
import { Link } from 'react-router'
const Home = () => {
  const [rating, setRating] = useState(1);
  

  return (
    <div className='home'>
      <Hero/>
      <KeyBenefit/>
      <div className="popular-course">
        <h1>Learn From Best</h1>
        <p className='subheading'>Start your journey with the courses learners love the most.</p>
        <div className="course">
          <div className="course-card">
            <img src={thumbnail1} alt="thumbnail-image" />
            <div>
              <p className='card-title'>Learn DSA in java</p>
              <p className='card-owner'>Mohit Kumar</p>
              <div className="star-section">
                <span className='avg-rating'>5</span> 
                <span className='rating-star'>
                  <Rating
                    readonly={true}
                    size={20}
                    allowHover={false}
                    initialValue={1}
                  />
                </span> 
                <span className='rating-no'>(1)</span>
              </div>
              <p className='card-label'>Free</p>
            </div>
          </div>

          <div className="course-card">
            <img src={thumbnail2} alt="thumbnail-image" />
            <div>
              <p className='card-title'>Learn DSA in java</p>
              <p className='card-owner'>Mohit Kumar</p>
              <div className="star-section">
                <span className='avg-rating'>5</span> 
                <span className='rating-star'>
                  <Rating
                    readonly={true}
                    size={20}
                    allowHover={false}
                    initialValue={1}
                  />
                </span> 
                <span className='rating-no'>(1)</span>
              </div>
              <p className='card-label'>Free</p>
            </div>
          </div>

          <div className="course-card">
            <img src={thumbnail3} alt="thumbnail-image" />
            <div>
              <p className='card-title'>Learn DSA in java</p>
              <p className='card-owner'>Mohit Kumar</p>
              <div className="star-section">
                <span className='avg-rating'>5</span> 
                <span className='rating-star'>
                  <Rating
                    readonly={true}
                    size={20}
                    allowHover={false}
                    initialValue={1}
                  />
                </span> 
                <span className='rating-no'>(1)</span>
              </div>
              <p className='card-label'>Free</p>
            </div>
          </div>

          <div className="course-card">
            <img src={thumbnail4} alt="thumbnail-image" />
            <div>
              <p className='card-title'>Learn DSA in java</p>
              <p className='card-owner'>Mohit Kumar</p>
              <div className="star-section">
                <span className='avg-rating'>5</span> 
                <span className='rating-star'>
                  <Rating
                    readonly={true}
                    size={20}
                    allowHover={false}
                    initialValue={3}
                  />
                </span> 
                <span className='rating-no'>(1)</span>
              </div>
              <p className='card-label'>Free</p>
            </div>
          </div>
        </div>
        <Link ><span className='call-to-action-button'>Show all Courses</span></Link>
      </div>
      <Testimonial/>
    </div>
  )
}

export default Home
