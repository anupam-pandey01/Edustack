const mongoose = require("mongoose");
const { Schema } = require("mongoose");


// Lesson Schema
const lessonSchema = new Schema({
    lessonTitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});


// Chapter Schema
const chapterSchema = new Schema({
    chapterTitle: {
        type: String,
    },
    lessons: [ lessonSchema ]
});


// Course Schema
const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseThumbnail: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    chapters: [ chapterSchema ]
});


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;