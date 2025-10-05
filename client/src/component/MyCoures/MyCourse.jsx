import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router"
import "./MyCourse.css"
import thumbnail1 from "../../assets/thumbnail1.png"
import { handleError } from '../../utils/handler'
import Spinner from '../Spinner/spinner'
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";


const MyCourse = ({userId}) => {
  const [courseData, setCourseData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectChapter, setSelectChapter] = useState(null)

  // This function Select the particular Course for dropdown
  const selectCourse = (i)=>{
    if(selected == i){
      return setSelected(null)
    }

    setSelected(i)
  }

  // This function Selcect the paricultar Chapter for dropdown
  const selectChap = (idx)=>{
    if(idx == selectChapter){
      return setSelectChapter(null)
    }

    setSelectChapter(idx)
  }

  useEffect(()=>{
    const getCourseInfo = async ()=>{
      if(!userId){
        setIsLoading(false)
        return
      }
      try{
        setIsLoading(true) // Start loading
        const url = `${import.meta.env.VITE_BASE_URL}/getCourseData/${userId}`
        const respone = await fetch(url);
        const data = await respone.json()
        setCourseData(data)
        setIsLoading(false)
      }catch(err){
        console.error("Educator: Error during the fetching course data", err);
        handleError(err.message)
      }
    }

    getCourseInfo()
  }, [userId]);
  
  
  return (
    <div className='mycourse'>
      <h1>My Courses</h1>
      <div className="mycourse-section">
        {courseData.map((course, i)=>(
            <div className='mycourse-container' key={course._id}>
              <div className="mycourse-card" onClick={()=> selectCourse(i)}>
                <div className='mycourse-card-left'>
                  <img src={thumbnail1} alt="" />
                  <div className='mycourse-card-body'>
                    <p className='course-title'>{course.courseTitle}</p>
                    <p className='date'>
                      Date: {new Date(course.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className='my-course-card-right'>
                  <button className='edit'><IoMdAdd size={24} color='#fff'/></button>
                  {/* <button className='edit'><MdModeEdit size={24} color='#fff'/></button> */}
                  <button className='delete'><AiOutlineDelete size={24} color='#fff'/></button>
                  <button className='accordion'>{ selected == i ? <IoMdArrowDropdown size={30}/> : <IoMdArrowDropup size={30}/> } </button>
                </div>
              </div>

              {/* Chapter Section */}
              <div className={selected == i ? "course-chapter-expand" : "course-chapter" }>
                {course.chapters.map((chapter, idx)=>(
                  <div className='course-chapter-section' key={chapter._id} onClick={()=> selectChap(idx)}>
                    <div className='chapter-info'>
                      <div className="chater-title">
                        <span className='s-no'>{idx + 1}.</span>
                        <span>{chapter.chapterTitle}</span>
                      </div>
                      <button>{selectChapter == idx ? <IoMdArrowDropdown size={30}/>  : <IoMdArrowDropup size={30}/>}</button>
                    </div>
                    
                    {/* Lesson Section */}
                    <div className={selectChapter == idx ? 'course-lesson' : "course-lesson-hide"}>
                      {chapter.lessons.map((lesson)=>(
                        <div className="lesson" key={lesson._id}>
                          <p>{lesson.lessonTitle}</p>
                          <div className='lesson-btn'>
                            <button className="update">Update</button> 
                            <button className="delete">Delete</button>
                          </div>
                        </div>
                      ))}
                      <div className="add-lesson">
                        <input type="text" placeholder='Add New Lesson'/>
                        <button>Add New lesson</button>
                      </div>
                    </div>
                  </div>
                ))}  
              </div> 
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyCourse
