const express = require("express");
const educatorRouter = express.Router();
const { uploadCourseData } = require("../controller/educatorController");
const upload = require("../Middleware/multer");
const auth = require("../Middleware/Auth");




educatorRouter.post("/uploadsCourseData", auth, upload.single("courseImage"), uploadCourseData)

module.exports = educatorRouter