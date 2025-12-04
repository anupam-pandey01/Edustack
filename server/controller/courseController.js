const Course = require("../model/course");
const User = require("../model/user");


const getCourseData = async (req, res)=>{
    try{
        const course = await Course.find({}).populate({
            path: 'createdBy',
            select: '-password -email' // Exclude both fields with a space
        })
        res.status(200).json({course: course})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error During the Course Data Fetching", success: false})
    }
}

const getCourseDetail = async (req, res)=>{
    try{
        const { courseId } = req.params
        if(!courseId){
            return res.status(400).json({message: "Bad Request", success: false})
        }
        const courseDetail = await Course.findById(courseId).populate({
            path: 'createdBy',
            select: '-password -email' // Exclude both fields with a space
        });

        res.status(200).json(courseDetail);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error during fetching course detail", success: false})
    }
}

const getFullArticle = async (req, res)=>{
    const { courseId } = req.params;
    if(!courseId){
        return res.status(400).json({message: "Bad Request", success: false})
    }

    try{
        const course = await Course.findById({_id: courseId});
        if(!course){
            return res.status(400).json({message: "Bad Request"})
        }
        res.satus(200).json(course);
    }catch(err){
        console.log("Error during the fetching full article", err);
        res.status(500).json({message: "Server error", sucess: false})
    }
};

const getMyEnrollment = async (req, res)=>{
    const { userId } = req.params;

    try{
        const user = await User.findById({_id: userId})
        .select("-password -email")
        .populate({ 
            path: "enrolledCourse", 
            select: "-chapters",
            populate: {
                path: "createdBy",
                select: "username"
            }
        })

        if (!user || user.enrolledCourse.length === 0){
            return res.status(404).json({message: "User not found", sucess: false});
        }

        return res.status(200).json({enrolledcourse: user.enrolledCourse});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error", success: false});
    }
}
module.exports = {
    getCourseData,
    getCourseDetail,
    getMyEnrollment,
}