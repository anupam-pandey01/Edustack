import React, {useState} from 'react'
import "./Educator.css"
import Sidebar from '../../component/Sidebar/Sidebar'
import Dashboard from '../../component/Dashboard/Dashboard';
import AddCourse from '../../component/AddCourse/AddCourse';
import MyCourse from '../../component/MyCoures/MyCourse';
import EnrolledStudent from '../../component/EnrolledStudent/EnrolledStudent';
import { Link, useParams, useSearchParams } from 'react-router';
import TextEditor from '../../component/TextEditor/TextEditor';

const Educator = () => {
  const [menu, setMenu] = useState("dashboard");
  const [open, setOpen] = useState(true);

  const {lessonId} = useParams()
  const {userId} = useParams();
  const {courseId} = useParams();
  

  // Extract query chapter name form url 
  const [searchParams] = useSearchParams();

  const chapterTitle = searchParams.get("chapterTitle");

  return (
    <div className={open?'educator-dashboard':"educator-dashboard-large"}>
      <Sidebar setMenu={setMenu} setOpen={setOpen} open={open} userId={userId}/>
      <main>
        {menu=="dashboard" &&  <Dashboard userId={userId}/>}
        {menu=="addcourse" &&  <AddCourse setMenu={setMenu}/>}
        {menu=="mycourse" && <MyCourse menu={menu} userId={userId} courseId={courseId} setMenu={setMenu}/>}
        {menu=="enrolledstudent" && <EnrolledStudent />}
        {menu=="texteditor" && <TextEditor courseId={courseId} lessonId={lessonId} chapterTitle={chapterTitle}/>}
      </main>
    </div>
  )
}

export default Educator
