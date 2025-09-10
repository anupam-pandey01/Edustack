const mongoose = require("mongoose");
const { Schema } = require("mongoose");


// Lesson Schema
const lessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    videourl: {
        type: String,
    },
    resource: {
        type: String
    }
});


// Chapter Schema
const chapterSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    
    lessons: [ lessonSchema ]
});

// Course Schema
const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {

    },
    chapters: [ chapterSchema ]
});


const Course = mongoose.model("Course", courseSchema);