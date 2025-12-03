const express = require("express");
const educatorRouter = express.Router();
const { uploadCourseData, getCourseData, addChapter, addLesson, saveLessonContent, fecthLessonContent, enrolledStudent, deleteCourse } = require("../controller/educatorController");
const upload = require("../Middleware/multer");
const auth = require("../Middleware/Auth");




educatorRouter.post("/uploadsCourseData", auth, upload.single("courseImage"), uploadCourseData);
educatorRouter.get("/getCourseData/:userId", auth, getCourseData);
educatorRouter.delete("/course/:userId/:courseId", deleteCourse);
educatorRouter.post("/chapter/new/:courseId", auth, addChapter);
educatorRouter.post("/lesson/new/:userId/:courseId",auth,  addLesson);
educatorRouter.post("/lesson/:courseId/:lessonId",auth,  saveLessonContent);
educatorRouter.get("/lesson/fetch/:courseId/:lessonId",auth, fecthLessonContent);
educatorRouter.post('/student/enrolled', enrolledStudent);


module.exports = educatorRouter