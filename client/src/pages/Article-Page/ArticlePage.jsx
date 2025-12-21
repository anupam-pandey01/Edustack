import React, { useState } from 'react';
import "./ArticlePage.css";
import ArticleSidebar from '../../component/ArticleSidebar/ArticleSidebar';
import { useParams } from 'react-router';
import DOMPurify from "dompurify";

const ArticlePage = () => {
  const { courseId } = useParams();
  const [article, setArticle] = useState("");

  return (
    <div className="article-page">
      <div className="article-sidebar">
        <ArticleSidebar courseId={courseId} setArticle={setArticle} />
      </div>

      <div className='aritcle-container'>
        <h2 className='aritcleLesson'>{article.lessonTitle}</h2>
        
        <div
          className="article-view"
          dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: [
                  'allow',
                  'allowfullscreen',
                  'frameborder',
                  'scrolling'
                ]
              })
          }}

        />
      </div>
      
    </div>
  );
};

export default ArticlePage;
