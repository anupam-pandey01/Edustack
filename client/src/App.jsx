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
import MyEnrollment from './pages/MyEnrollment/MyEnrollment'
import CourseDescription from './pages/CourseDescription/CourseDescription'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './utils/ProtectedRoute'
import { useAuth } from './AuthContext'
import LaunchingPage from './pages/Launch/LaunchingPage'
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'

const App = () => {
  const [isDashboard, setIsDashboard] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <div className='app'>
      <Navbar isDashboard={isDashboard} setIsDashboard={setIsDashboard}/>
      <Routes>
        {/* Public Route */}
        <Route path='/auth' element={isLoggedIn ? <Navigate to="/" replace/> :<Auth/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/course-list' element={<CourseList/>}/>
        <Route path='/course-list/:courseId' element={<CourseDescription/>}/>
        <Route path='/review' element={<LaunchingPage/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

        
        <Route path="*" element={<Navigate to="/" replace/>}/>
        {/* Protected Route */}
        <Route element={<ProtectedRoute/>}>
          <Route path='/educator/:userId' element={<Educator/>}/>
          <Route path='/educator/:userId/c/:courseId' element={<Educator/>}/>
          <Route path='/educator/:userId/c/:courseId/:lessonId' element={ < Educator /> }/>
          <Route path="/enrollment/:userId" element={<MyEnrollment/>}/>
          <Route path='/course-list/article/:courseId/' element={<ArticlePage/>}/>
        </Route>
        
      </Routes>
      <Footer/>
      < ToastContainer />
    </div>
  )
}

export default App
