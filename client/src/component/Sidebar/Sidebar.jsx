import React, { useState } from 'react'
import "./Sidebar.css"
import { FaHome, FaUser } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { MdDashboard, MdAddCircle, MdBookmark, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"
import { Link } from 'react-router';
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '../../AuthContext';

const Sidebar = ({setMenu, setOpen, open, userId}) => {
  const {mobileMenu, setmobileMenu} = useAuth()
  return (
    <>
      <aside id={open?'sidebar':'sidebar-small'}>
          {open ? <MdOutlineKeyboardDoubleArrowLeft size={26} style={{position: "absolute", left: "264px", top: "80px", cursor: "pointer", border: "1px solid black", borderRadius: "50%", backgroundColor: "black", color: "#fff", padding: "2px"}} onClick={()=> setOpen(!open)}/> : <FaAnglesRight size={22} 
          onClick={()=> setOpen(!open)} style={{position: "absolute", left: "88px", top:"80px", cursor: "pointer", border: "1px solid black", borderRadius: "50%", backgroundColor: "black", color: "#fff", padding: "2px"}}/>
          }
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("dashboard")}>
            <FaHome size={27}/>  <span className={open?"":"sidebar-item"}> DASHBOARD</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("addcourse")}>
            <MdAddCircle size={27}/> <span className={open?"":"sidebar-item"}> ADD COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("mycourse")}>
            <MdBookmark size={27}/> <span className={open?"":"sidebar-item"}> My COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("enrolledstudent")}>
            <FaUser size={27}/> <span className={open?"":"sidebar-item"}>ENROLLED STUDENT</span>
          </Link>
        </aside>

        {mobileMenu ?  <></> : <div className="mobile-side-bar">
          <IoCloseSharp size={30} className="sidebar-closer" onClick={()=> setmobileMenu(!mobileMenu)}/>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("dashboard")}>
            <FaHome size={27}/>  <span className={open?"":"sidebar-item"}> DASHBOARD</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("addcourse")}>
            <MdAddCircle size={27}/> <span className={open?"":"sidebar-item"}> ADD COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("mycourse")}>
            <MdBookmark size={27}/> <span className={open?"":"sidebar-item"}> My COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("enrolledstudent")}>
            <FaUser size={27}/> <span className={open?"":"sidebar-item"}>ENROLLED STUDENT</span>
          </Link>
        </div>}
      </>
  )
}

export default Sidebar
