import React from 'react'
import "./MyEnrollment.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { handleError } from '../../utils/handler'
import { useParams, useNavigate } from 'react-router'
import Spinner from '../../component/Spinner/Spinner'

const MyEnrollment = () => {
  const [enrolledcourse, setEnrolledCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  const navigate = useNavigate()

  useEffect(()=>{
    async function getMyEnrollment(){
      const token = localStorage.getItem("token");
      setIsLoading(true)
      try{
        const url = `${import.meta.env.VITE_BASE_URL}/myEnrollment/${userId}`;
        const res = await fetch(url, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
        });

        if(res.status == 401){
          checkToken("Token Expired");
        }

        const { enrolledcourse } = await res.json()
        setEnrolledCourse(enrolledcourse);
        setIsLoading(false)
      }catch(err){
        console.log(err);
        handleError(err);
      }
    };
    getMyEnrollment();
  }, [])
  return (
    <div className='my-enrollment'>
      <h1>My Enrollment</h1>
      {isLoading ? <Spinner/>: <></>}
      {enrolledcourse?.map((course)=>(
        <div className='my-enrollment-container' key={course?._id}>
          <div className="my-enrollment-card">
            <div className='my-enrollment-course-info'>
                <img src={course?.courseThumbnail} alt="course-Image" />

              <div className='my-enrollment-title'>
                <p className='my-enrollment-course-title'>
                  {course?.courseTitle}
                </p>
                <p className='my-enrollment-course-author'>
                  Course By <span>{course?.createdBy?.username?.toUpperCase()}</span>
                </p>
              </div>
            </div>
            <button onClick={()=> navigate(`/course-list/article/${course._id}`)}>Continue</button>
          </div>
        </div>
      ))}
      {enrolledcourse ? <></> : handleError("You are not enrolled in any course")}
      {enrolledcourse ? <></> : navigate("/course-list")}
    </div>
  )
}

export default MyEnrollment
