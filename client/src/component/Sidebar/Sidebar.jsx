import React, { useState } from 'react'
import "./Sidebar.css"
import { FaHome, FaUser } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { MdDashboard, MdAddCircle, MdBookmark, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md"
const Sidebar = ({setMenu, setOpen, open}) => {
  
  return (
    <aside id={open?'sidebar':'sidebar-small'}>
        {open ? <MdOutlineKeyboardDoubleArrowLeft size={26} style={{position: "absolute", left: "264px", top: "80px", cursor: "pointer", border: "1px solid black", borderRadius: "50%", backgroundColor: "black", color: "#fff", padding: "2px"}} onClick={()=> setOpen(!open)}/> : <FaAnglesRight size={22} 
        onClick={()=> setOpen(!open)} style={{position: "absolute", left: "88px", top:"80px", cursor: "pointer", border: "1px solid black", borderRadius: "50%", backgroundColor: "black", color: "#fff", padding: "2px"}}/>
        }
        <div className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("dashboard")}>
          <FaHome size={27}/>  <span className={open?"":"sidebar-item"}> DASHBOARD</span>
        </div>
        <div className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("addcourse")}>
          <MdAddCircle size={27}/> <span className={open?"":"sidebar-item"}> ADD COURSE</span>
        </div>
        <div className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("mycourse")}>
          <MdBookmark size={27}/> <span className={open?"":"sidebar-item"}> My COURSE</span>
        </div>
        <div className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("enrolledstudent")}>
          <FaUser size={27}/> <span className={open?"":"sidebar-item"}>ENROLLED STUDENT</span>
        </div>
    </aside>
  )
}

export default Sidebar
