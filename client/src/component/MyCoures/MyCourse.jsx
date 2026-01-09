import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router"
import "./MyCourse.css"
import { handleError, handleSuccess } from '../../utils/handler'
import Spinner from '../Spinner/Spinner'
import { AiOutlineDelete } from "react-icons/ai"
import { IoMdArrowDropdown } from "react-icons/io"
import { IoMdArrowDropup } from "react-icons/io"
import { MdModeEdit } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"
import AddNewChapter from '../AddNewChapter/AddNewChapter'
import { checkToken } from '../../utils/checkToken'



const MyCourse = ({userId, courseId, setMenu}) => {
  const [courseData, setCourseData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectChapter, setSelectChapter] = useState(null);
  const [newLesson, setNewLesson] = useState("");
  const [popOpen, setPopOpen] = useState(false);

  const token = localStorage.getItem("token")
  // This function Select the particular Course for dropdown
  const selectCourse = (id)=>{
    if(selected == id){
      return setSelected(null)
    }
    setSelected(id)
    // When  a course is selected the chapter id become null
    setSelectChapter(null)
  }

  // This function Selcect the paricultar Chapter for dropdown
  const selectChap = (idx)=>{
    if(idx == selectChapter){
      return setSelectChapter(null)
    }
    
    setSelectChapter(idx)
  }
  
  const handleDeleteCourse = async(courseId)=>{
    try{
      const url = `${import.meta.env.VITE_BASE_URL}/course/${userId}/${courseId}`;
      const res = await fetch(url, {
        method: "Delete",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`
        }
      });

      if(res.status == 401){
        checkToken("Token Expired");
      }

      const {message, success, course} = await res.json()
      if(success){
        handleSuccess(message);
        setCourseData(course);
      }else{
        handleError(message);
      }
    }catch(err){
      console.log(err)
      handleError(err)
    }
  }

// Handling  DELETE LESSON
const handleDeleteLesson = async(chapterTitle, lessonId)=>{
  try{
    const url = `${import.meta.env.VITE_BASE_URL}/deleteLesson/${courseId}/${lessonId}?chapterTitle=${chapterTitle}`;
    const res = await fetch(url, {
      method: "DELETE", 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    if(res.status == 401){
      checkToken("Token Expired");
    }
    const { updatedCourse, message, success } = await res.json()
    if(success){
      setCourseData(updatedCourse);
      handleSuccess(message);
    }else{
      handleError(message)
    }
  }catch(err){
    console.log(err)
    handleError(err);
  }
}

// Handling the Add New Lesson
  const handleAddNewLesson = async (chapterTitle)=>{
    const url = `${import.meta.env.VITE_BASE_URL}/lesson/new/${userId}/${courseId}?chapterTitle=${chapterTitle}`;
    const res = await fetch(url, {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({lessonTitle: newLesson})
    });
    if(res.status == 401){
      checkToken("Token Expired");
    }
    const data = await res.json();
    setCourseData(data.course);
    setNewLesson("")
  }

  // This useEffect use for getting data form  Database
  useEffect(()=>{
    const getCourseInfo = async ()=>{
      if(!userId){
        setIsLoading(false)
        return
      }
      try{
        setIsLoading(true) // Start loading
        const url = `${import.meta.env.VITE_BASE_URL}/getCourseData/${userId}`
        const response = await fetch(url, {
          method: "GET",
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if(response.status == 401){
          checkToken("Token Expired");
        }
        const {data, message, success} = await response.json();
        if(success){
          setCourseData(data)
        }else{
          handleError("You have not created any course");
          setMenu('addcourse')
        }
        
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
        {isloading ? <Spinner isloading={isloading}/>: <></>}
        {popOpen ?<AddNewChapter courseId={courseId} setCourseData={setCourseData} setPopOpen={setPopOpen}/>: <></> }
        {courseData?.map((course)=>(
            <div  className='mycourse-container' key={course._id}>
              <div className="mycourse-card">
                <div className='mycourse-card-left'>
                  <img src={course.courseThumbnail} alt="" />
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
                  <button className='edit' onClick={()=> setPopOpen(!popOpen)}>{popOpen ? <Link to={`/educator/${userId}`}><IoMdAdd size={24} color='#fff'/></Link> : <Link to={`/educator/${userId}/c/${course._id}`}><IoMdAdd size={24} color='#fff'/></Link>}</button>
                  {/* <button className='edit'><MdModeEdit size={24} color='#fff'/></button> */}
                  <button className='delete' onClick={()=> handleDeleteCourse(course._id)} > <AiOutlineDelete size={24} color='#fff'/></button>
                  <button className='accordion' onClick={()=> selectCourse(course._id) }> { selected == course._id ? <Link to={`/educator/${userId}`}> <IoMdArrowDropdown size={30}/> </Link> : <Link to={`/educator/${userId}/c/${course._id}`}><IoMdArrowDropup size={30}/></Link> } </button>
                </div>
              </div>

              {/* Chapter Section */}
              <div className={selected == course._id ? "course-chapter-expand" : "course-chapter" }>
                {course.chapters.map((chapter, idx)=>(
                  <div className='course-chapter-section' key={chapter._id}>
                    <div className='chapter-info'>
                      <div className="chater-title" >
                        <span className='s-no'>{idx + 1}.</span>
                        <span>{chapter.chapterTitle}</span>
                      </div>
                      <button onClick={()=> selectChap(idx)}>{selectChapter == idx ? <Link to={`/educator/${userId}/c/${course._id}`}> <IoMdArrowDropdown size={30}/> </Link>  : <Link to={`/educator/${userId}/c/${course._id}?chapterTitle=${chapter.chapterTitle}`}> <IoMdArrowDropup size={30}/> </Link>}</button>
                    </div>
                    
                    {/* Lesson Section */}
                    <div className={selectChapter == idx ? 'course-lesson' : "course-lesson-hide"}>
                      {chapter.lessons.map((lesson)=>(
                        <div className="lesson" key={lesson._id}>
                          <p>{lesson.lessonTitle}</p>
                          <div className='lesson-btn'>
                            <Link to={`/educator/${userId}/c/${course?._id}/${lesson?._id}?chapterTitle=${chapter?.chapterTitle}`}> <button className="update" onClick={()=> setMenu("texteditor")}>Update</button></Link>
                            <button className="delete" onClick={()=> handleDeleteLesson(chapter?.chapterTitle, lesson._id?.toString())}>Delete</button>
                          </div>
                        </div>
                      ))}
                      <div className="add-lesson">
                        <input type="text" placeholder='Add New Lesson' value={newLesson} onChange={(e)=> setNewLesson(e.target.value)}/>
                        <button onClick={()=> handleAddNewLesson(chapter.chapterTitle)}>Add New lesson</button>
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
