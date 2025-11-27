const express = require("express");
const educatorRouter = express.Router();
const { uploadCourseData, getCourseData, addChapter, addLesson, saveLessonContent, fecthLessonContent } = require("../controller/educatorController");
const upload = require("../Middleware/multer");
const auth = require("../Middleware/Auth");




educatorRouter.post("/uploadsCourseData", auth, upload.single("courseImage"), uploadCourseData);
educatorRouter.get("/getCourseData/:userId", getCourseData);
educatorRouter.post("/chapter/new/:courseId", addChapter);
educatorRouter.post("/lesson/new/:userId/:courseId", addLesson);
educatorRouter.post("/lesson/:courseId/:lessonId", saveLessonContent);
educatorRouter.get("/lesson/fetch/:courseId/:lessonId", fecthLessonContent);

module.exports = educatorRouter