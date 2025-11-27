import React, {useState} from 'react'
import Navbar from './component/Navbar/Navbar'
import Auth from './pages/Auth/Auth'
import { Routes, Route, useLocation, Navigate} from 'react-router'
import Home from './pages/Home/Home'
import Footer from './component/Footer/Footer'
import Educator from './pages/Educator/Educator'
import CourseList from './pages/Course-List/CourseList'
import ArticlePage from './pages/Article-Page/ArticlePage'
import TextEditor from './component/TextEditor/TextEditor'
import MyEnrollment from './pages/Myenrollment/Myenrollment'
import CourseDescription from './pages/CourseDescription/CourseDescription'

const App = () => {
  const [isDashboard, setIsDashboard] = useState(false);


  return (
    <div className='app'>
      <Navbar isDashboard={isDashboard} setIsDashboard={setIsDashboard}/>
      <Routes>
        {/* Public Route */}
        <Route path='/auth' element={<Auth/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/course-list' element={<CourseList/>}/>
        <Route path='/course-list/:courseId' element={<CourseDescription/>}/>
        
        <Route path="*" element={<Navigate to="/" replace/>}/>
        {/* Protected Route */}
        <Route path='/educator/:userId' element={<Educator/>}/>
        <Route path='/educator/:userId/c/:courseId' element={<Educator/>}/>
        <Route path='/educator/:userId/c/:courseId/:lessonId' element={ < Educator /> }/>
        <Route path="/enrollment/:userId" element={<MyEnrollment/>}/>
        <Route path='/course/list/:courseId/' element={<ArticlePage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
