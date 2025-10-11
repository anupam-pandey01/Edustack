import React from 'react'
import "./CourseList.css"
import thumbnail1 from "../../assets/thumbnail1.png"
import { Rating } from "react-simple-star-rating"
import { Link } from 'react-router'

const CourseList = () => {
  return (
    <div className='CourseList'>
      <div className="course">
        <Link to={`/course/list/${13455}`} className="course-card">
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
        </Link>

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
      </div>
    </div>
  )
}

export default CourseList
