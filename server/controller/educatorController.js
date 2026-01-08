const Course = require("../model/course.js");
const User = require("../model/user.js");
const cloudinary = require("../config/cloudinaryConfig.js");
const { uploadCourseSchema, addChapterSchema } = require("../utils/validateSchema.js");


// Upload Course Data to cloud DB
const uploadCourseData = async (req, res) => {
  try {
    const { courseTitle, courseDescription } = req.body;

    // Validate Input from frontend
    const { error } = uploadCourseSchema.validate(req.body);
    if( error ){
      return res.status(404).json({ success: false, message: error.details[0].message })
    }
    
    // Thumbnail must be requried
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Course thumbnail is required",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cldRes = await cloudinary.uploader.upload(dataURI, {
      folder: "courses",
    });

    const newCourse = new Course({
      courseTitle,
      courseDescription,
      courseThumbnail: cldRes.secure_url,
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
    
    course.chapters.push({ chapterTitle });
    await course.save();
    const updatedCourse = await  Course.find({createdBy: course.createdBy});

    res.status(201).json({ message: "New Chapter Added", success: true, course: updatedCourse });

  }catch(err){
    console.log("Error during the adding chapter", err);
    res.status(500).json({message: "Server Error"});
  }
}

// Controller for adding the New Lesson
const addLesson = async (req, res)=>{
  const { chapterTitle } = req.query;
  const { courseId } = req.params;
  const { userId } = req.params;
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
    const addNewLesson = await course.save();
    const updatedCourse = await Course.find({createdBy: userId});
    res.status(201).json({
      message: "Lesson added successfully to chapter.",
      success: true,
      course: updatedCourse,
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
      return res.status(404).json({message: "No course found for this educator", success: false})
    }
    res.status(200).json({ data: courseData, success: true })
  }catch(err){
    console.error("Error during the fetching the course data for educator", err);
    res.status(500).json({message: "Server Error", success: false})
  }
}

const fecthLessonContent = async(req, res)=>{
  const {courseId} = req.params;
  const {chapterTitle} = req.query;
  const {lessonId} = req.params;
  
  try{
    const course = Course.findById({_id: courseId});

    if(!course){
      res.status(404).json({message: "Course Not Found", success: false})
      return
    }

    const chapter = course.chapters.find(
      (chapter)=> chapter.chapterTitle === chapterTitle
    )

    if(!chapter){
      res.status(404).json({message: "chapter Not Found", success: false})
      return
    }

    const lesson = chapter.lessons.find(
      (lesson)=> lesson._id == lessonId
    )

    if(!lesson){
      res.status(404).json({message: "Lesson Not Found", success: false})
      return
    }

    const html = lesson.content
    res.status(200).json({html})
  }catch(err){
    console.log("Error during fetching lesson content", err);
    res.status(500).json({message: "Server error", success: false})
  }
}



// Controller for the lesson content to save html in the db 
const saveLessonContent = async (req, res)=>{
  const { courseId } = req.params;
  const {chapterTitle} = req.query;
  const { lessonId } = req.params;
  const { html } = req.body; 
  try{
    const course = await Course.findById({_id: courseId});

    if(!course){
      res.status(404).json({message: "Course Not Found", success: false})
      return
    }
  
   
    const chapter = course.chapters.find(
      (chap)=> chap.chapterTitle === chapterTitle
    );
    

    if(!chapter){
      res.status(404).json({message: "chapter Not Found", success: false})
      return
    }

    const lesson = chapter.lessons.find(
      (lesson)=> lesson._id == lessonId
    );
   
    if(!lesson){
      res.status(404).json({message: "Lesson Not Found", success: false})
      return
    }

    lesson.content = html
    await course.save()
    res.status(200).json({message: "Updated Successfully", success: true, course})
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Server Error", success: false})
  }
}


// Enrolled Student 
const enrolledStudent = async (req, res)=>{
  const {educatorId, studentId, courseName, courseId} = req.body;
  try{
    // Add Student to Educator 
    // await User.findByIdAndUpdate({_id: educatorId},
    //   { $addToSet: { enrolledStudent: studentId } },  // avoid duplicates
    //   { new: true }
    // )
    // await User.findByIdAndUpdate({_id: studentId}, 
    //   {$addToSet: {enrolledCourse: courseId}},
    //   { new: true }
    // )
    const educator = await User.findById({_id: educatorId});
    const student = await User.findById({_id: studentId});

    if (!educator || !student){
      return res.status(404).json({message: "User not found", success: fales})
    }

    // Add Enrolled Student to Educator
    const enrolled = {
      username: student.username,
      courseName: courseName,
      date: new Date()
    }
    educator.enrolledStudent.push(enrolled);
    await educator.save()

    // Adding the CourseId to the Student
    await User.findByIdAndUpdate(
      studentId,
      {$addToSet: {enrolledCourse: courseId}},
      {new: true}
    )

    return res.status(201).json({message: "Enrolled Successfully", success: true})
  }catch(err){
    console.log(err)
    res.status(500).json({message: "Enrollement Failed", success: false})
  }
}


const deleteCourse = async(req, res)=>{
    try{
        const { courseId } = req.params;
        const { userId }  = req.params;

        if (!courseId){
           return res.status(404).json({message: "Course not found", success: false})
        }
        
        await Course.findByIdAndDelete({_id: courseId});

        await User.updateMany(
            {enrolledCourse: courseId},
            { $pull: {enrolledCourse: courseId}}
        )
        const updatedCourse = await Course.find({createdBy: userId});
        return res.status(200).json({message: "Course Deleted Successfully", success: true, course: updatedCourse});
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error", success: false});
    }
};


const getHtml = async(req, res)=>{
  const { lessonId, courseId } = req.params;
  const { chapterTitle } = req.query;
  
  try{
    const course = await Course.findById(courseId).populate({
      path: "createdBy",
      select: "-email -password"
    });

    if(!course){
      return res.status(404).json({message: "Course not found", success: false})
    }

    const chapter = course.chapters.find((chapter) => chapter.chapterTitle === chapterTitle);

    if(!chapter){
      return res.status(404).json({message: "Chapter not found", success: false});
    }

    const lesson = chapter.lessons.find((lesson)=> lesson._id == lessonId);

    if(!lesson){
      return res.status(404).json({message: "Lesson not found", success: false});
    }

    return res.status(200).json({ lesson: lesson, success: true });
  }catch(err){
    console.log(err);
    return res.status(500).json({message: "Server Error", success: false});
  }
};

const saveHtml = async(req, res)=>{
  const { lessonId, courseId } = req.params;
  const { chapterTitle } = req.query;
  const { html } = req.body;

  try{
    const course = await Course.findById(courseId).populate({
      path: "createdBy",
      select: "-email -password"
    });

    if(!course){
      return res.status(404).json({message: "Course not found", success: false})
    }

    const chapter = course.chapters.find((chapter) => chapter.chapterTitle === chapterTitle);

    if(!chapter){
      return res.status(404).json({message: "Chapter not found", success: false});
    }

    const lesson = chapter.lessons.find((lesson)=> lesson._id == lessonId);

    if(!lesson){
      return res.status(404).json({message: "Lesson not found", success: false});
    }

    lesson.content = html;
    await course.save()
    return res.status(200).json({ message: "Lesson updated successfully", success: true });
  }catch(err){
    console.log(err);
    return res.status(500).json({message: "Server Error", success: false});
  }
}

const deleteLesson = async(req, res)=>{
    const { courseId, lessonId } = req.params;
    const { chapterTitle } = req.query;

    try{
      const course = await Course.findById(courseId);
      if(!course){
        return res.status(404).message("Course not found");
      }
      const chapter = course.chapters.find(chapter => chapter.chapterTitle == chapterTitle);
      const lessonIndex = chapter.lessons.findIndex(lesson => lesson._id.toString() == lessonId);

      if(lessonIndex === -1){
        return res.status(404).json({ message: "Lesson not found" });
      }

      const lesson = chapter.lessons.splice(lessonIndex, 1);
      const result = await course.save();
      const updatedCourse = await Course.find({createdBy: course.createdBy});
      res.status(200).json({message: `${lesson[0].lessonTitle} Delete Successfully`, success: true, updatedCourse})
    }catch(err){
      console.log(err);
      res.status(500).json({ message:"Server Error", success: false})
    }
}

module.exports = { 
    uploadCourseData, 
    getCourseData, 
    addChapter, 
    addLesson,
    saveLessonContent , 
    fecthLessonContent,
    enrolledStudent, 
    deleteCourse, 
    getHtml,
    saveHtml, 
    deleteLesson
  }