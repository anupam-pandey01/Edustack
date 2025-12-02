import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import books from "../../assets/books.png"
import student from "../../assets/student.png"
import enrolled from "../../assets/enrolled.svg"
import { handleError } from '../../utils/handler'
import { checkToken } from '../../utils/checkToken'

const Dashboard = ({userId}) => {
  const [data, setData] = useState({});
  const [totalCourse, setTotalCourse] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    async function getUserData(){
      try{
        const url = `${import.meta.env.VITE_BASE_URL}/getUserdetail/${userId}`;
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
        const {user, totalCourse} = await res.json();
        setData(user);
        setTotalCourse(totalCourse);
      }catch(err){
        console.log(err);
        handleError(err);
      }
    };
    getUserData()
  }, [])
  return (
    <div className='dashboard'>
      {/* Dashboard Info Section */}
      <div className="dashboard-info">
        <div className='dashborad-card'>
          <img src={student} alt="" />
          <div className="data">
            <p className='number'>{data?.enrolledStudent?.length}</p>
            <p>Students Enrolled</p>
          </div>
        </div>
        <div className='dashborad-card'>
          <img src={books} alt="" />
          <div className="data">
            <p className='number'>{totalCourse}</p>
            <p>Total Courses</p>
          </div>
        </div>
      </div> 

      {/* Dashborad Recent Activity Section */}
      <div className="table-section">
        <h2>Recent Enrollments</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.enrolledStudent?.map((student, idx)=>(
              <tr key={idx}>
                <td>{student?.username?.toUpperCase()}</td>
                <td>{student.courseName}</td>
                <td>{student.date.split(" ").slice(1, 4).join("-")}</td>
                <td className="status enrolled">Enrolled</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
