import React from 'react'
import "./AddCourse.css"
import { FaCloudUploadAlt } from "react-icons/fa";

const AddCourse = () => {
  return (
    <div className='add-course'>
      <h1>Add Course</h1>
      <div className='course-input'>
        <label htmlFor="course-tile">Course Title</label>
        <input type="text" id='course-title' placeholder='Enter the title of course'/>
      </div>
      <div className='course-input'>
        <label htmlFor="course-tile">Course Description</label>
        <textarea type="text" id='course-title' rows={8} placeholder='Enter the description of course'/>
      </div>
      <div className='course-input upload-thumbnail'>
        <label htmlFor="upload-thumbnail">Upload Thumbnail <FaCloudUploadAlt size={30}/></label>
        <input type="file" id='upload-thumbnail' style={{display: "none"}}/>
      </div>
      <button>Add Course</button>
    </div>
  )
}

export default AddCourse
