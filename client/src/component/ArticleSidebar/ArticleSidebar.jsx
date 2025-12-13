import React, { useState } from 'react'
import "./ArticleSidebar.css"
import { FaAngleDown } from "react-icons/fa6";

const ArticleSidebar = () => {

    const [lessonSet, setLessonSet] = useState(new Set());

    function handleLesson(idx) {
        setLessonSet(prev => {
        const newSet = new Set(prev);
        newSet.has(idx) ? newSet.delete(idx) : newSet.add(idx);
        return newSet;
        });
    }
    const allChapter = [
        {
            chapter: "What is Node",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "Node-Installation",
            lesson: ["lesson 1", "lesson 2", "lesson 3"]
        },

        {
            chapter: "History of Node",
            lesson: [ "lesson 1", "lesson 2", "lesson 3"]
        }
    ]

  return (
    <div className='article-sidebar-container'>
        <h3>All Chapter</h3>
      <div className='article-sidebar'>
            {allChapter.map((chapter, idx)=>(
                <div className="chapter-container" onClick={()=>handleLesson(idx)}>
                    <div className="chapter">
                        <span>{chapter.chapter}</span>
                        <FaAngleDown size={16}/>
                    </div>
                    {
                        lessonSet.has(idx) && 

                        <div className='lesson-container'>
                            {chapter.lesson.map((lesson)=>(
                                <div className='lesson'>{lesson}</div>
                            ))}
                            
                        </div>
                    }
                    
                </div>
            ))}
            
      </div>
    </div>
  )
}

export default ArticleSidebar
