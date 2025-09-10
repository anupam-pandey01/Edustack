import React from 'react'
import "./Dashboard.css"
import books from "../../assets/books.png"
import student from "../../assets/student.png"
import enrolled from "../../assets/enrolled.svg"
const Dashboard = () => {
  return (
    <div className='dashboard'>
      {/* Dashboard Info Section */}
      <div className="dashboard-info">
        <div className='dashborad-card'>
          <img src={student} alt="" />
          <div className="data">
            <p className='number'>1</p>
            <p>Students Enrolled</p>
          </div>
        </div>
        <div className='dashborad-card'>
          <img src={books} alt="" />
          <div className="data">
            <p className='number'>10</p>
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
            <tr>
              <td>John Doe</td>
              <td>React Basics</td>
              <td>Sept 5, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
            <tr>
              <td>Priya Sharma</td>
              <td>Data Structures</td>
              <td>Sept 4, 2025</td>
              <td className="status enrolled">Enrolled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
