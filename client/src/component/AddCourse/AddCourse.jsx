import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa"
import { useNavigate } from "react-router"
import "./AddCourse.css"
import { checkToken } from '../../utils/checkToken'
import { handleError } from '../../utils/handler'
import { addCourse } from '../../services/addCourse'
import { validateCourseInputs } from '../../utils/validators'

const AddCourse = ({ setMenu }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  // const [errors, setErrors] = useState({});
  const [isloading, setIsLoading] = useState(false);

  // const validateCourseData = () => {
  //   const validationErrors = validateCourseInputs({ courseTitle, courseDescription, courseImage });
  //   setErrors(validationErrors);
  //   return Object.keys(validationErrors).length === 0;
  // };

  const handleFormData = async (e) => {
    e.preventDefault()

    const validationErrors = validateCourseInputs({ courseTitle, courseDescription, courseImage});
    if(validationErrors){
      handleError(validationErrors)
      return
    }
    setIsLoading(true);
    try {
      const courseData = new FormData();
      courseData.append("courseTitle", courseTitle.trim());
      courseData.append("courseDescription", courseDescription.trim());
      courseData.append("courseImage", courseImage);

      const data = await addCourse(courseData);
      if (!data) return;

      if (data.success) {
        // setMenu("mycourse");
      } else {
        handleError(data.message);
      }
    } catch (err) {
      console.error("Add Course Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='add-course' onSubmit={handleFormData}>
      <h1>Add Course</h1>
      <div className='course-input'>
        <label htmlFor="course-tile">Course Title</label>
        <input type="text" id='course-title' placeholder='Enter the title of course' name='courseTitle' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/>
      </div>
      <div className='course-input'>
        <label htmlFor="course-title" >Course Description</label>
        <textarea type="text" id='course-title' rows={8} placeholder='Enter the description of course' value={courseDescription} name='courseDescription' onChange={e => setCourseDescription(e.target.value)} />
      </div>
      <div className='course-input upload-thumbnail'>
        <label htmlFor="upload-thumbnail">{courseImage ? "Selected" :"Course Thumbnail"} <FaCloudUploadAlt size={30}/></label>
        <input type="file" id='upload-thumbnail' style={{display: "none"}} onChange={(e)=> setCourseImage(e.target.files[0])} />
      </div>
      {/* <button disabled={isloading}>{isloading ? "Loading..." :"Add Course" }</button> */}
      <button>Add Course</button>
    </form>
  )
}

export default AddCourse
