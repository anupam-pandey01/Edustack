const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const enrolledSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    courseName:{
        type: String,
        required: true,
    },
    date: {
        type: String,
    }
})

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['instructor', 'student']
    },
    enrolledStudent:[ enrolledSchema ],
    enrolledCourse:[
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;