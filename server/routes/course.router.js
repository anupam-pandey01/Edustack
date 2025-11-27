const courseRouter = require("express").Router();
const { getCourseData, getCourseDetail } = require("../controller/courseController")

courseRouter.get("/course/list", getCourseData);
courseRouter.get("/course/list/:courseId", getCourseDetail)

module.exports = courseRouter;