import React from 'react'
import "./CourseDescription.css"
import { FaBook } from "react-icons/fa6";
import thumbnail from "../../assets/Thumbnail1.png"
import { FaPencilAlt } from "react-icons/fa";

const CourseDescription = () => {
  return (
    <div className='course-description'>
      <div className="course-info">
            <div className='course-info-upper'>
                <h1 className='course-title'>Cloud Computing Essentials</h1>
                <p>Master Cloud Fundamentals. learn the foundations of cloud computing and explore popular cloud platforms like AWS ,Azure and Google Cloud. This course is ideal for It professionals and devel</p>
                <p>Course by Anupam Pandey</p>
            </div>

            <div className='course-info-middle'>
                <h3>Course Structure</h3>
                <div className='course-info-chapter'>
                    <p>Cloud Fundamentals</p>
                    <div className='course-info-lesson'>
                        <p>What is cloud computing</p>
                        <p>Cloud Sevice Models</p>
                    </div>
                </div>
            </div>

            <div className="course-info-lower">
                <h3>Course Description</h3>
                <p>Master Cloud Fundamentals. learn the foundations of cloud computing and explore popular cloud platforms like AWS ,Azure and Google Cloud. This course is ideal for It professionals and devel</p>
            </div>
      </div>
      <div className='course-enrolled-card'>
            <div className='course-enrolled-image'>
                <img src={thumbnail} alt="" />
            </div>
            <p className='enrolled-card-title'>Cloud Computing</p>
            <div className='enrolled-card-info'>
                <span className='enrolled-card-label'>Free</span>
                <span>|</span>
                <p className='enrolled-card-chapter '><FaBook /> 30 Chapter</p>
                <span>|</span>
                <p className='enrolled-card-lesson'><FaPencilAlt /> 5 lesson</p>
            </div>
            <button className='enrolled-card-button'>Enroll Now</button>
        </div>
    </div>
  )
}

export default CourseDescription
