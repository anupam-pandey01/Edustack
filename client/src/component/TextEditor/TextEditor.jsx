import React, { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { checkToken } from '../../utils/checkToken';
import { handleError } from "../../utils/handler"

const TextEditor = ({ courseId, chapterTitle, lessonId }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");   // stores updated content from editor

  const [initialContent, setInitialContent] = useState(""); // Saves initial Content through API
  const [lesson, setLesson] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  
  const token = localStorage.getItem("token");
  // console.log(courseId);
  // console.log(lessonId);
  // console.log(chapterTitle);

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

  // Fetch existing HTML when the component loads
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`/lesson/fetch/:courseId/:lessonId`);
  //       const data = await res.json();
  //       setContent(data.html || ''); // 👈 set editor value
  //     } catch (err) {
  //       console.error('Error fetching content:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [documentId]);

  // const config = {
  //   height: 500,
  //   buttons: [
  //     'bold', 'italic', 'underline', '|',
  //     'font', 'fontsize', 'paragraph', '|',
  //     'link', '|',
  //     'align', 'undo', 'redo', 'fullsize', 'preview'
  //   ],
  // };

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
            "link", "|",
            "align", "undo", "redo", "fullsize", "preview"
          ],
        }}
        onChange={(html) => setContent(html)} // typing stays smooth
      />
    );
  }, [isLoaded]);

  // const handleUpdate = async () => {
  //   await fetch(`/api/content/${documentId}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ html: content }),
  //   });
  //   alert('Updated successfully!');
  // };

  // if (loading) return <p>Loading existing content...</p>;

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
      >
        Update
      </button>
    </div>
    // <div style={{ width: '100%', }}>
    //   <h2>{lesson?.lessonTitle}</h2>
    //  {isLoaded && (
    //   <JoditEditor
    //     ref={editor}
    //     value={initialContent}     // ✔ initial load only
    //     config={config}
    //     onChange={(html) => setContent(html)}  // live typing
    //   />
    // )}

    

    //   <button
    //     // onClick={handleUpdate}
    //     style={{
    //       marginTop: '20px',
    //       background: '#007bff',
    //       color: 'white',
    //       border: 'none',
    //       padding: '10px 20px',
    //       borderRadius: '5px',
    //       cursor: 'pointer',
    //     }}
    //   >
    //     Update
    //   </button>
    // </div>
  );
};

export default TextEditor;
