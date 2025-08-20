import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Auth from './pages/Auth/Auth'
import { Routes, Route} from 'react-router'
import Home from './pages/Home/Home'
import Footer from './component/Footer/Footer'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
