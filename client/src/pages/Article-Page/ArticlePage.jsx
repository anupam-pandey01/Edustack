import React, { useState } from 'react';
import "./ArticlePage.css";
import ArticleSidebar from '../../component/ArticleSidebar/ArticleSidebar';
import { useParams } from 'react-router';

const ArticlePage = () => {
  const { courseId } = useParams();
  const [article, setArticle] = useState("");

  return (
    <div className="article-page">
      <div className="article-sidebar">
        <ArticleSidebar courseId={courseId} setArticle={setArticle} />
      </div>

      <div
        className="article-view"
        dangerouslySetInnerHTML={{ __html: article }}
      />
    </div>
  );
};

export default ArticlePage;
