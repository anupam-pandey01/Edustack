const Course = require("../model/course.js");
const cloudinary = require("../config/cloudinaryConfig.js");


const uploadCourseData = async (req, res) => {
  try {
    const { courseTitle, courseDescription } = req.body
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cldRes = await cloudinary.uploader.upload(dataURI, {
      folder: "courses",
    });

    const newCourse = new Course({
      courseTitle,
      courseDescription,
      courseThumbnail: cldRes.public_id,
      createdBy: req.user.id
    })

    const result = await newCourse.save()
    
    res.status(201).json({
      message: "Course uploaded successfully",
      success: true,
      result: result
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
module.exports = { uploadCourseData }