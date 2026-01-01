const express = require("express");
const educatorRouter = express.Router();
const { uploadCourseData, getCourseData, addChapter, addLesson, saveLessonContent, fecthLessonContent, enrolledStudent, deleteCourse, getHtml, saveHtml, deleteLesson } = require("../controller/educatorController");
const upload = require("../Middleware/multer");
const auth = require("../Middleware/Auth");




educatorRouter.post("/uploadsCourseData", auth, upload.single("courseImage"), uploadCourseData);
educatorRouter.get("/getCourseData/:userId", auth, getCourseData);
educatorRouter.delete("/course/:userId/:courseId", auth, deleteCourse);
educatorRouter.post("/chapter/new/:courseId", auth, addChapter);
educatorRouter.post("/lesson/new/:userId/:courseId",auth,  addLesson);
educatorRouter.post("/lesson/:courseId/:lessonId",auth,  saveLessonContent);
educatorRouter.get("/lesson/fetch/:courseId/:lessonId",auth, fecthLessonContent);
educatorRouter.delete("/deleteLesson/:courseId/:lessonId", deleteLesson);
educatorRouter.post('/student/enrolled',auth, enrolledStudent);
educatorRouter.get("/getHtml/:courseId/:lessonId",auth, getHtml);
educatorRouter.put("/saveHtml/:courseId/:lessonId",auth, saveHtml);


module.exports = educatorRouter