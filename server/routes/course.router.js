const courseRouter = require("express").Router();
const auth = require("../Middleware/Auth");
const { getCourseData, getCourseDetail, getMyEnrollment, getFullArticle, checkEnrolled } = require("../controller/courseController")

courseRouter.get("/course/list", getCourseData);
courseRouter.get("/course/list/:courseId", getCourseDetail);
courseRouter.get("/myEnrollment/:userId",auth, getMyEnrollment);
courseRouter.get("/articleData/:courseId",auth, getFullArticle);
courseRouter.get("/checkEnrollment/:userId/:courseId", checkEnrolled);

module.exports = courseRouter;