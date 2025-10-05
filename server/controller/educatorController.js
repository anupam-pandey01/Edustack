const Course = require("../model/course.js");
const cloudinary = require("../config/cloudinaryConfig.js");

// Upload Course Data to cloud DB
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
    console.error("Error during the uploading the course data",error)
    res.status(500).json({ error: error.message });
  }
};

// Controller to Add Chapter in the course
const addChapter = async (req, res)=>{
  const { courseId } = req.params;
  const { chapterTitle } = req.body;

  if(!chapterTitle){
    res.status(400).json({message: "Course Title is Requried"});
    return
  }

  try{
    const course = await Course.findById({_id: courseId});

    if(!course){
      res.status(404).json({message: "Course Not Found"});
      return
    }
    
    course.chapters.push({ chapterTitle })
    const addNewChapter = await course.save()

    res.status(201).json({message: "New Chapter Added", success: true, course: addNewChapter});

  }catch(err){
    console.log("Error during the adding chapter", err);
    res.status(500).json({message: "Server Error"});
  }
}

// Controller for adding the New Lesson
const addLesson = async (req, res)=>{
  const { chapterTitle } = req.query;
  const { courseId } = req.params;
  const { lessonTitle } = req.body;
  
  if(!lessonTitle){
    res.status(400).json({message: "Lesson title is required", success: false});
    return
  }

  try{
    const course = await Course.findById({_id: courseId});

    if(!course){
      res.status(404).json({message: "Course Not Found", success: false})
      return
    }

    // Find Specific Chapter based on chapter
    const chapter = course.chapters.find(
      (chap) => chap.chapterTitle === chapterTitle
    )

    if(!chapter){
      res.status(404).json({message: `Chapter with title ${courseTitle} not found in this course`});
      return
    }

    chapter.lessons.push({ lessonTitle });
    // console.log(course)
    // console.log(course.chapters[1].lessons)
    const addNewLesson = await course.save();

    res.status(201).json({
      message: "Lesson added successfully to chapter.",
      success: true,
      course: addNewLesson,
    })
  }catch(err){
    console.log("Error during adding lesson", err);
    res.status(500).json({message: "Server Error"})
  }

}

// Controller for Educator so he get data from mongodb cloud
const getCourseData = async (req, res)=>{
  try{
    const {userId} = req.params;
    const courseData = await Course.find({createdBy: userId});
    if(!courseData || courseData.length == 0){
      return res.status(200).json({message: "No course found for this educator", success: false})
    }
    res.status(200).json(courseData)
  }catch(err){
    console.error("Error during the fetching the course data for educator", err);
    res.status(500).json({message: "Server Error", success: false})
  }
}


module.exports = { 
    uploadCourseData, 
    getCourseData, 
    addChapter, 
    addLesson 
  }