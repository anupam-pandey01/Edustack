import React, {useState, useEffect} from 'react'
import "./ArticlePage.css"
import ArticleSidebar from '../../component/ArticleSidebar/ArticleSidebar'
import { handleError } from '../../utils/handler';
import { useParams } from 'react-router';


const ArticlePage = () => {
  const { courseId } = useParams();
  const [ article, setArticle ] = useState("");

  return (
    <div className='article-page'>
      <div className="article-sidebar">
        <ArticleSidebar courseId={courseId} setArticle={setArticle}/>
      </div>
      <div className="aricle-view">
        {/* Render the html from the DB */}
        <p>Hello</p>
      </div>
    </div>
  )
}

export default ArticlePage
