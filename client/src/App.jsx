import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Auth from './pages/Auth/Auth'
import { Routes, Route} from 'react-router'
import Home from './pages/Home/Home'
import Footer from './component/Footer/Footer'
import Educator from './pages/Educator/Educator'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/educator/:userId' element={<Educator/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
