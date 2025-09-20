import React, {useState} from 'react'
import { FaCloudUploadAlt } from "react-icons/fa"
import { useNavigate } from "react-router"
import "./AddCourse.css"



const AddCourse = ({ setMenu }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);
 
  const navigate = useNavigate();

  // Handle Form Data
  const handleFormData = async (e)=>{
    e.preventDefault();
  
    // We use here formData for multipart/formdata
    const formData = new FormData()
    formData.append("courseTitle", courseTitle)
    formData.append("courseDescription", courseDescription)
    formData.append("courseImage", courseImage)
    

    const token = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_BASE_URL}/uploadsCourseData`;
    const response = await fetch(url,{
      method: "POST",
      headers:{
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    // Reseting the inputs
    setCourseTitle("")
    setCourseDescription("")
    let data = await response.json()
  }
  return (
    <form className='add-course' onSubmit={handleFormData}>
      <h1>Add Course</h1>
      <div className='course-input'>
        <label htmlFor="course-tile">Course Title</label>
        <input type="text" id='course-title' placeholder='Enter the title of course' name='courseTitle' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/>
      </div>
      <div className='course-input'>
        <label htmlFor="course-tile" >Course Description</label>
        <textarea type="text" id='course-title' rows={8} placeholder='Enter the description of course' value={courseDescription} name='courseDescription' onChange={e => setCourseDescription(e.target.value)}/>
      </div>
      <div className='course-input upload-thumbnail'>
        <label htmlFor="upload-thumbnail">{courseImage ? "Selected" :"Course Thumbnail"} <FaCloudUploadAlt size={30}/></label>
        <input type="file" id='upload-thumbnail' style={{display: "none"}} onChange={(e)=> setCourseImage(e.target.files[0])}/>
      </div>
      <button>Add Course</button>
    </form>
  )
}

export default AddCourse
