import React, { useEffect, useState } from 'react'
import "./CourseList.css"
import { Rating } from "react-simple-star-rating"
import { FaHome } from "react-icons/fa";
import CourseCard from '../../component/CourseCard/CourseCard'
import { Link, useSearchParams } from 'react-router'
import Spinner from '../../component/Spinner/Spinner';

const CourseList = () => {
 const [courseData, setCourseData] = useState([]);
 const [query, setQuery] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 
 const [ searchParams ] = useSearchParams();
 useEffect(()=>{
  const search = searchParams.get("search") || "";
  setQuery(search);
 }, [searchParams])

 
 useEffect(()=>{
  const getCourseData = async ()=>{
    setIsLoading(true)
    try{
      const url = `${import.meta.env.VITE_BASE_URL}/course/list`
      const res = await fetch(url, {
        method: "GET", 
      });

      const data = await res.json()
      setIsLoading(false)
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
        <span className='course-info-breadCrumb'><Link to={"/"} className='bread-crumb-link'>< FaHome size={28}/></Link><span>/</span> <span>Course-list</span></span>
        <div className='course-list-input'>
          <input type="text"  placeholder='Enter the course name' value={query} onChange={(e)=> { setQuery(e.target.value) }}/>
          <button>Search</button>
        </div>
      </div>

      <div className="all-course">
        {isLoading ? <Spinner/>: <></>}
        {
          courseData?.filter((course) =>  course.chapters?.some(chapter => chapter.lessons?.some(lesson => lesson.content)) && course?.courseTitle?.toLowerCase().replace(/\s+/g, "").includes(query?.toLowerCase().replace(/\s+/g, ""))).map((course)=>( 
            <CourseCard courseTitle={course.courseTitle} courseOwner={course.createdBy.username} 
            createdAt={course.createdAt} courseId={course._id} courseImage={course.courseThumbnail}
            key={course._id}/>
          ))
        }
        
      </div>
    </div>
  )
}

export default CourseList
