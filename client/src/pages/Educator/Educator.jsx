import React, {useState} from 'react'
import "./Educator.css"
import Sidebar from '../../component/Sidebar/Sidebar'
import Dashboard from '../../component/Dashboard/Dashboard';
import AddCourse from '../../component/AddCourse/AddCourse';
import MyCourse from '../../component/MyCoures/MyCourse';
import EnrolledStudent from '../../component/EnrolledStudent/EnrolledStudent';
import { Link } from 'react-router';

const Educator = () => {
  const [menu, setMenu] = useState("dashboard");
  const [open, setOpen] = useState(true);

  return (
    <div className={open?'educator-dashboard':"educator-dashboard-large"}>
      <Sidebar setMenu={setMenu} setOpen={setOpen} open={open}/>
      <main>
        {menu=="dashboard" &&  <Dashboard/>}
        {menu=="addcourse" &&  <AddCourse setMenu={setMenu}/>}
        {menu=="mycourse" && <MyCourse />}
        {menu=="enrolledstudent" && <EnrolledStudent />}
      </main>
    </div>
  )
}

export default Educator
