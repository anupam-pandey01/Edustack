import React from 'react'
import "./Testimonial.css"
import { Rating } from "react-simple-star-rating"

const Testimonial = () => {
  return (
    <div className='testimonial-section'>
      <h1>Voices of Our Community</h1>
      <p className='subheading'>Real experiences from students who are growing with our free platform</p>
        <div className="testimonial">
                <div className="testimonial-card">
                <span>
                    <Rating
                        allowHover={false}
                        readonly={true}
                        initialValue={1}
                        size={30}
                        fillColor='#f2ff03ff'
                        emptyColor='#fff'
                    />
                </span>
                <p className='feedback'>I never thought I could access quality courses without paying anything. This platform has completely changed the way I study. The lessons are clear, easy to follow, and I can learn at my own pace. It’s like having a personal tutor — for free!</p>
                <p className='username'>Mohit Kumar</p>
                <p className='feedback-date'>June 01, 2025</p>
            </div>

            <div className="testimonial-card">
                <span>
                    <Rating
                        allowHover={false}
                        readonly={true}
                        initialValue={1}
                        size={30}
                        fillColor='#f2ff03ff'
                        emptyColor='#fff'
                    />
                </span>
                <p className='feedback'>"What I love the most is how accessible this platform is. I can log in anytime from my phone or laptop and pick up right where I left off. It feels like a supportive learning community where everyone has the chance to grow, no matter their background.</p>
                <p className='username'>Karan Verma</p>
                <p className='feedback-date'>June 05, 2025</p>
            </div>
        </div>
    </div>
  )
}

export default Testimonial
