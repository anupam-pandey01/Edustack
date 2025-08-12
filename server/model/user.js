const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['instructor', 'student']
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;