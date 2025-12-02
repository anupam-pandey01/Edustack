import React, { useEffect } from 'react'
import './CourseCard.css'
import thumbnail1 from "../../assets/thumbnail1.png"
import { Rating } from "react-simple-star-rating"
import { Link } from 'react-router'

const CourseCard = ({ courseTitle, courseOwner, courseId, courseImage }) => {
 
  return (
    <Link to={`/course-list/${courseId}`} className="course-card">
        <img src={courseImage} alt="thumbnail-image" />
        <div>
            <p className='card-title'>{courseTitle}</p>
            <p className='card-owner'>{courseOwner}</p>
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
  )
}

export default CourseCard
