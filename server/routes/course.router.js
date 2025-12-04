const courseRouter = require("express").Router();
const auth = require("../Middleware/Auth");
const { getCourseData, getCourseDetail, getMyEnrollment } = require("../controller/courseController")

courseRouter.get("/course/list", getCourseData);
courseRouter.get("/course/list/:courseId", getCourseDetail);
courseRouter.get("/myEnrollment/:userId",auth, getMyEnrollment);

module.exports = courseRouter;