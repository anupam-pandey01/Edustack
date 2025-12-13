import React from 'react'
import "./ArticlePage.css"
import ArticleSidebar from '../../component/ArticleSidebar/ArticleSidebar'


const ArticlePage = () => {
  return (
    <div className='article-page'>
      <div className="article-sidebar">
        <ArticleSidebar/>
      </div>
      <div className="aricle-view">
        {/* Render the html from the DB */}
      </div>
    </div>
  )
}

export default ArticlePage
