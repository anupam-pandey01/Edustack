import React, { useState } from 'react'
import "./Sidebar.css"
import { FaHome, FaUser } from "react-icons/fa";
import { MdAddCircle, MdBookmark } from "react-icons/md"
import { Link } from 'react-router';
import { IoCloseSharp } from "react-icons/io5";


const Sidebar = ({setMenu, userId, dashboardMenu, setDashboardMenu}) => {
  
  return (
    <>
      <aside id='sidebar'>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("dashboard")}>
            <FaHome size={27}/>  <span> DASHBOARD</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("addcourse")}>
            <MdAddCircle size={27}/> <span> ADD COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("mycourse")}>
            <MdBookmark size={27}/> <span> My COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className={open?"sidebar-brand":"sidebar-brand-small"} onClick={()=>setMenu("enrolledstudent")}>
            <FaUser size={27}/> <span>ENROLLED STUDENT</span>
          </Link>
      </aside>

        {dashboardMenu ? <div className="mobile-side-bar">
          <IoCloseSharp size={30} className="sidebar-closer" onClick={()=> setDashboardMenu(false)}/>
          <Link to={`/educator/${userId}`} className="sidebar-brand" onClick={()=>setMenu("dashboard")}>
            <FaHome size={27}/>  <span> DASHBOARD</span>
          </Link>
          <Link to={`/educator/${userId}`} className="sidebar-brand" onClick={()=>setMenu("addcourse")}>
            <MdAddCircle size={27}/> <span> ADD COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className="sidebar-brand" onClick={()=>setMenu("mycourse")}>
            <MdBookmark size={27}/> <span> My COURSE</span>
          </Link>
          <Link to={`/educator/${userId}`} className="sidebar-brand" onClick={()=>setMenu("enrolledstudent")}>
            <FaUser size={27}/> <span>ENROLLED STUDENT</span>
          </Link>
        </div>: <></>}
      </>
  )
}

export default Sidebar
