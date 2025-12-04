import React, { useEffect, useState } from 'react'
import "./CourseDescription.css"
import { FaBook } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router"
import { FaPencilAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { handleError, handleSuccess } from '../../utils/handler';
import { checkToken } from '../../utils/checkToken';

const CourseDescription = () => {
    const [data, setData] = useState({});
    const [selected, setSelected] = useState(null)
    const {courseId} = useParams();


    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
 
  useEffect(()=>{
    async function getCourseData(){
        const url = `${import.meta.env.VITE_BASE_URL}/course/list/${courseId}`;
        const response = await fetch(url, {
            method: "GET", 
        });
        const result = await response.json()
        setData(result)
    }
    getCourseData();
  }, [])

// Handle Accordion
  const handleAccordion = (i)=>{
    if (selected === i){
       return setSelected(null)
    }
    setSelected(i)
  }

// Handle Enrollment
  const handleEnrollment = async (educatorId, courseName)=>{
    try{
        const url = `${import.meta.env.VITE_BASE_URL}/student/enrolled`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({educatorId: educatorId, studentId: userId, courseId: courseId, courseName: courseName})
        })
 
        // Check that is token is valid or expried
        if(response.status == 401){
            checkToken("Token Expired");
        }

        const {success, message} = await response.json()
        if (success){
            handleSuccess(message)
            setTimeout(()=>{
                navigate(`/course-list/article/${courseId}`)
            }, 3000)
        }
        else{
            handleError(message)
        }
    }catch(err){
        handleError(err.message)
    }
  }
  return (
    <div className='course-description'>
        <span className='course-info-breadCrumb'><Link to={"/"} className='bread-crumb-link'>< FaHome size={28}/></Link><span>/</span> <Link to="/course-list" className='bread-crumb-link'>Course-list</Link> <span>/</span> <span>Description</span></span>
       <div className='course-description-container'>
            <div className="course-info">
                <div className='course-info-upper'>
                    <h1 className='course-title'>{data.courseTitle}</h1>
                    <p className='course-info-description'>{data.courseDescription}</p>
                    <p className='course-info-author'>Course by {data?.createdBy?.username.toUpperCase()}</p>
                </div>

                <div className='course-info-middle'>
                    <h3>Course Structure</h3>
                    {data?.chapters?.map((chapter, i)=>(
                        <div className='course-info-chapter' key={i}>
                            <div className='chapter-info-accordion' onClick={()=> handleAccordion(i)}>
                                <p>{chapter.chapterTitle}</p>
                                {selected == i ? <IoIosArrowDropdownCircle size={24}/> : <IoIosArrowDropupCircle size={24}/>}
                                
                            </div>
                            {
                                selected == i 
                                ? 
                            chapter?.lessons.map((lesson, idx)=>(
                                    <div className='course-info-lesson'>
                                        <p>{lesson.lessonTitle}</p>
                                    </div>
                            ))
                                :
                                <></>
                            } 
                        </div>   
                    ))}
                </div>

                    <div className="course-info-lower">
                        <h3>Course Description</h3>
                        <p>{data.courseDescription}</p>
                    </div>
            </div>
            <div className='course-enrolled-card'>
                <div className='course-enrolled-image'>
                    <img src={data?.courseThumbnail} alt="" />
                </div>
                <p className='enrolled-card-title'>{data?.courseTitle}</p>
                <div className='enrolled-card-info'>
                    <span className='enrolled-card-label'>Free</span>
                    <span>|</span>
                    <p className='enrolled-card-chapter '><FaBook />{data?.chapters?.length} Chapter</p>
                    <span>|</span>
                    <p className='enrolled-card-lesson'><FaPencilAlt /> 
                    4 lesson
                    </p>
                </div>
                <button className='enrolled-card-button' onClick={()=>handleEnrollment(data?.createdBy._id, data.courseTitle)}>Enroll Now</button>
            </div>
        </div>
    </div>
  )
}

export default CourseDescription
