import React, { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { checkToken } from '../../utils/checkToken';
import { handleError, handleSuccess } from "../../utils/handler"

const TextEditor = ({ courseId, chapterTitle, lessonId, setMenu }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");   // stores updated content from editor

  const [initialContent, setInitialContent] = useState(""); // Saves initial Content through API
  const [lesson, setLesson] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  
  const token = localStorage.getItem("token");

  const handleUpdate = async ()=>{
    try{
      if (!lessonId || !courseId) return ;

      const url = `${import.meta.env.VITE_BASE_URL}/saveHtml/${courseId}/${lessonId}?chapterTitle=${chapterTitle}`;
      const res = await fetch(url,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ html: content })
      })

      if(res.status == 401){
        checkToken("Token Expired");
      }

      const { success, message } = await res.json();

      if(success){
        handleSuccess(message);
        setMenu("mycourse");
      }else{
        handleError(message);
      }
    }catch(err){
      console.log(err);
      handleError(err);
    }
  }
  useEffect(()=>{
    async function getHtml(){
      if (!lessonId || !courseId) return;
      try{
        const url = `${import.meta.env.VITE_BASE_URL}/getHtml/${courseId}/${lessonId}?chapterTitle=${chapterTitle}`;
        const res = await fetch(url, {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token }`
          }
        });
        
        if(res.status == 401){
          checkToken("Token Expired");
        }
        const { success, lesson, message } = await res.json();
        if(success){
          setLesson(lesson);
          setInitialContent(lesson.content || "");
          setIsLoaded(true);
        }
        else{
          handleError(message);
        }
      }catch(err){
        console.log(err);
        handleError(err);
      }
    };
    getHtml()
  }, [lessonId])

  const editorComponent = useMemo(() => {
    if (!isLoaded) return null;

    return (
      <JoditEditor
        ref={editorRef}
        value={initialContent}
        config={{
          height: 500,
          buttons: [
            "bold", "italic", "underline", "|",
            'ul', 'ol', '|',
            "font", "fontsize", "paragraph", "|",
            "image","video","link", "|",
            "align", "undo", "redo", "preview"
          ],
        }}
        onChange={(html) => setContent(html)} // typing stays smooth
      />
    );
  }, [isLoaded]);

  return (
    <div style={{ width: '100%', }}>
      <h2 style={{marginBottom: "40px"}}>{lesson?.lessonTitle}</h2>
      {editorComponent}

      <button
       style={{
          marginTop: '20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}

        onClick={()=> handleUpdate()}
      >
        Update
      </button>
    </div>
  );
};

export default TextEditor;
