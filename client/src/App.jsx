import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Auth from './pages/Auth/Auth'
import { Routes, Route} from 'react-router'
import Home from './pages/Home/Home'
import Footer from './component/Footer/Footer'
import Educator from './pages/Educator/Educator'
import CourseList from './pages/Course-List/CourseList'
import CourseDetails from './pages/Course-Details/CourseDetails'   
import CoursePlayer from './pages/Course-Player/CoursePlayer'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/educator/:userId' element={<Educator/>}/>
        <Route path='/educator/:userId/c/:courseId' element={<Educator/>}/>
        <Route path='/course/list' element={<CourseList/>}/>
        <Route path='/course/list/:courseId' element={<CourseDetails/>}/>
        <Route path='/course/list/:courseId/play' element={<CoursePlayer/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
