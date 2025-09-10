import React from 'react'
import { Link } from "react-router"
import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.jpg"
import thumbnail3 from "../../assets/thumbnail3.png"
import "./MyCourse.css"

const MyCourse = () => {
  return (
    <div className='mycourse'>
      <h1>My Courses</h1>

      <div className="mycourse-section">
        <div className="mycourse-card">
          <img src={thumbnail1} alt="" />
          <div className="card-body">
            <p className='card-title'>Learn DSA in JAVA <i>2 Sep 2025</i></p>
            <p className='card-author'>Rishabh Kumar Tiwari</p>
            <div className="card-footer">
              <button className='edit-button'> Add Chapter</button>
              <button className='delete-button'>Delete</button>
            </div>
          </div>
        </div>

        <div className="mycourse-card">
          <img src={thumbnail2} alt="" />
          <div className="card-body">
            <p className='card-title'>Learn DSA in JAVA <i>2 Sep 2025</i></p>
            <p className='card-author'>Rishabh Kumar Tiwari</p>
            <div className="card-footer">
              <button className='edit-button'> Add Chapter</button>
              <button className='delete-button'>Delete</button>
            </div>
          </div>
        </div>

        <div className="mycourse-card">
          <img src={thumbnail3} alt="" />
          <div className="card-body">
            <p className='card-title'>Learn DSA in JAVA <i>2 Sep 2025</i></p>
            <p className='card-author'>Rishabh Kumar Tiwari</p>
            <div className="card-footer">
              <button className='edit-button'>Add Chapter</button>
              <button className='delete-button'>Delete</button>
            </div>
          </div>
        </div>
        <div className="mycourse-card">
          <img src={thumbnail3} alt="" />
          <div className="card-body">
            <p className='card-title'>Learn DSA in JAVA <i>2 Sep 2025</i></p>
            <p className='card-author'>Rishabh Kumar Tiwari</p>
            <div className="card-footer">
              <button className='edit-button'>Add Chapter</button>
              <button className='delete-button'>Delete</button>
            </div>
          </div>
        </div>

        <div className="mycourse-card">
          <img src={thumbnail1} alt="" />
          <div className="card-body">
            <p className='card-title'>Learn DSA in JAVA <i>2 Sep 2025</i></p>
            <p className='card-author'>Rishabh Kumar Tiwari</p>
            <div className="card-footer">
              <button className='edit-button'> Add Chapter</button>
              <button className='delete-button'>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCourse
