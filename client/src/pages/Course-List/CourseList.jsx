import React, { useEffect, useState } from 'react'
import "./CourseList.css"
import thumbnail1 from "../../assets/thumbnail1.png"
import { Rating } from "react-simple-star-rating"
import { FaHome } from "react-icons/fa";
import CourseCard from '../../component/CourseCard/CourseCard'
import { Link } from 'react-router'

const CourseList = () => {
 const [courseData, setCourseData] = useState([]);

 useEffect(()=>{
  const getCourseData = async ()=>{
    try{
      const url = `${import.meta.env.VITE_BASE_URL}/course/list`
      const res = await fetch(url, {
        method: "GET", 
      });

      const data = await res.json()
      setCourseData(data.course)
    }catch(err){
      console.log("Client Error: Course Data fetching failed",err)
    }
    
  }

  getCourseData()
 }, [])

  return (
    <div className='course-list'>
      <div className='search-section'>
        <span><Link to={"/"}>< FaHome size={28}/></Link> <span>/</span> <span>Course-list</span></span>
        <div className='course-list-input'>
          <input type="text"  placeholder='Enter the course name'/>
          <button>Search</button>
        </div>
      </div>

      <div className="all-course">
        {
          courseData.map((course)=>{
           return <CourseCard courseTitle={course.courseTitle} courseOwner={course.createdBy.username} 
            createdAt={course.createdAt} courseId={course._id} courseImage={course.courseThumbnail}
            key={course._id}/>
          })
        }
        
      </div>
    </div>
  )
}

export default CourseList
