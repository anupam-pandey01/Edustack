import React, { useState, useEffect } from 'react'
import "./Home.css"
import Hero from '../../component/Hero/Hero'
import KeyBenefit from '../../component/KeyBenefit/KeyBenefit'
import thumbnail2 from "../../assets/thumbnail2.jpg"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import Testimonial from '../../component/Testimonial/Testimonial'
import { Link } from 'react-router'
import CourseCard from '../../component/CourseCard/CourseCard'
const Home = () => {
  const [rating, setRating] = useState(1);
  const [courseData, setCourseData] = useState([]);
  
  useEffect(()=>{
    const getCourseData = async ()=>{
      try{
        const url = `${import.meta.env.VITE_BASE_URL}/course/list`
        const res = await fetch(url, {
          method: "GET", 
        });
  
        const data = await res.json()
  
        setCourseData(data.course.slice(0, 4))
      }catch(err){
        console.log("Client Error: Course Data fetching failed",err)
      }
      
    }
  
    getCourseData()
  }, [])

  return (
    <div className='home'>
      <Hero/>
      <KeyBenefit/>
      <div className="popular-course">
        <h1>Learn From Best</h1>
        <p className='subheading'>Start your journey with the courses learners love the most.</p>
        <div className="course">
          {
            courseData.filter(course => course.chapters.some(chapter => // Filter course based on the some function
              chapter.lessons.some(lesson => 
                lesson.content && lesson.content.trim() !== "" // check that course must have at least one lesson which have content
            )))
            .map((course)=>{
              return <CourseCard courseTitle={course.courseTitle} courseOwner={course.createdBy.username} createdAt={course.createdAt} courseId={course._id} courseImage={course.courseThumbnail}/>
            })
          }
        </div>
        <Link to={"/course-list"} className='call-to-action-button'><span>Show all Courses</span></Link>
      </div>

      
      <Testimonial/>
    </div>
  )
}

export default Home
