import React from 'react'
import "./ArticlePage.css"


const ArticlePage = () => {
  return (
    <div className='article-page'>
      <div className="article-sidebar">
        <div className="article-chpater">
          <p className='chpater-name'>Chpater 1</p>
          <div className="article-lesson">
            <p className='lesson-name'>What is Node.js</p>
          </div>
        </div>
      </div>


      <div className="aricle-view">
        {/* Render the html from the DB */}
      </div>
    </div>
  )
}

export default ArticlePage
