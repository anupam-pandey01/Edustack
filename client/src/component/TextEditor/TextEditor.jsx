import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({ documentId }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch existing HTML when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/lesson/fetch/:courseId/:lessonId`);
        const data = await res.json();
        setContent(data.html || ''); // 👈 set editor value
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId]);

  const config = {
    height: 500,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'font', 'fontsize', 'paragraph', '|',
      'image', 'link', '|',
      'align', 'undo', 'redo', 'fullsize', 'preview'
    ],
    uploader: { insertImageAsBase64URI: true },
  };

  const handleUpdate = async () => {
    await fetch(`/api/content/${documentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: content }),
    });
    alert('Updated successfully!');
  };

  if (loading) return <p>Loading existing content...</p>;

  return (
    <div style={{ width: '100%', }}>
      <h2>How to install node.js</h2>
      <JoditEditor
        ref={editor}
        value={content}     // 👈 existing HTML rendered here
        config={config}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)} // updates when user edits
      />
      <button
        onClick={handleUpdate}
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
  );
};

export default TextEditor;
