import React, { useState, useEffect } from 'react'
import "./ArticleSidebar.css"
import { checkToken } from '../../utils/checkToken';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { handleError } from '../../utils/handler';

const ArticleSidebar = ({ courseId, setArticle }) => {
    const [lessonSet, setLessonSet] = useState(new Set());
    const [data, setData] = useState({});
    const token = localStorage.getItem("token");

    useEffect(()=>{
        const getCourseData = async ()=>{
        try{
            const url = `${import.meta.env.VITE_BASE_URL}/articleData/${courseId}`;
            const res = await fetch(url, {
                method: "GET", 
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        
            if(res.status == 401){
                checkToken("Token Expired");
            }

            const { success, course } = await res.json();
            if(success){
                setData(course)
            }
            }
        catch(err){
            console.log(err);
            handleError(err);
        }
        };
        getCourseData()
    }, []);

    function handleLesson(idx) {
        setLessonSet(prev => {
            const newSet = new Set(prev);
            newSet.has(idx) ? newSet.delete(idx) : newSet.add(idx);
            return newSet;
        });
    }
    
  return (
    <div className='article-sidebar-container'>
        <h3>{data?.courseTitle?.split(" ").slice(0, 4).join(" ") + "..."}</h3>
      <div className='article-sidebar'>
            {data?.chapters?.map((chapter, idx)=>(
                chapter.lessons.length != 0 
                && 
                chapter.lessons[0].content 
                && 

                ( <div className="chapter-container" >
                    <div className="chapter" onClick={ ()=> {
                        handleLesson(idx)
                        selectContent(chapter.chapterTitle, chapter.lessons[0].lessonTitle)
                    }}>
                        <span>{chapter?.chapterTitle}</span>
                        {
                           lessonSet.has(idx) ? <IoIosArrowUp size={24}/>  : <IoIosArrowDown size={24}/>
                        }   
                    </div>
                    {
                        lessonSet.has(idx)
                        && 
                        (<div className='lesson-container'>
                            {chapter?.lessons?.map((lesson)=>(
                                lesson.content 
                                && 
                                (< div className='lesson' onClick={ ()=>selectContent(chapter.chapterTitle, lesson.lessonTitle) }>{lesson?.lessonTitle}</div> )
                            ))}
                        </div>)
                    }
                    
                </div> )
            ))}
            
      </div>
    </div>
  )
}

export default ArticleSidebar
