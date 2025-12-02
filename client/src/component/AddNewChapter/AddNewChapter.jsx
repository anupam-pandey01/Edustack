import React, { useEffect, useState } from 'react'
import "./AddNewChapter.css"
import { handleError } from '../../utils/handler'
import { checkToken } from '../../utils/checkToken'

const AddNewChapter = ({courseId, setCourseData, setPopOpen}) => {
  const [chapterTitle, setChapterTitle] = useState("")
  const token = localStorage.getItem("token");

    useEffect(()=>{
      document.body.style.overflowY = 'hidden';
      return ()=> {
        document.body.style.overflowY = 'scroll';
      }
    }, [])
    
    const handleAddNewChapter = async () =>{
      try{
        const url = `${import.meta.env.VITE_BASE_URL}/chapter/new/${courseId}`;
        const res = await fetch(url, {
          method: "POST", 
          headers:{
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ chapterTitle })
        });

        if(res.status == 401){
          checkToken("Token Expired");
        }

        const data = await res.json()
        setCourseData(data.course)
        setPopOpen(false)
      }catch(err){
        console.log(err);
        handleError(err);
      }
    }
  return (
    <div className='addnewchpater-message'>
        <div className='background-blur' onClick={()=>setPopOpen(false)}></div>
        <div className='addnewchapter'>
          <div className='chapter-header'>Add New Chapter</div>
          <div className="chapter-input">
              <input type="text" placeholder='Enter the chapter name' value={chapterTitle} onChange={(e)=> setChapterTitle(e.target.value)}/>
              <button onClick={handleAddNewChapter}>Add</button>
          </div>
        </div>
    </div>
  )
}

export default AddNewChapter
