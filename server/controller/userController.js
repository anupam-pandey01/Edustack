const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Course = require('../model/course');
const { loginSchema, registerUserSchema } = require("../utils/validateSchema");

// Controller for the Sign Up route
async function registerUser(req, res){
    try{
        const {username, password, email, role} = req.body;

        const { error } = registerUserSchema.validate(req.body);
        if( error ){
            return res.status(404).json({ success: false, message: error.details[0].message })
        }

        const existUser = await User.findOne({$or: [{username}, {email}]});
        if(existUser){
            return res.status(400).json({
                success: false,
                message: "username or email already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashPassword,
            email,
            role
        });

        const user = await newUser.save();
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "24h"})
        return res.status(200).json({
            success: true,
            message: "User registered successfully!",
            token,
            userId: user._id
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}


// Controller for Login route
async function loginUser(req, res){
    try{
        const {email, password} = req.body;
        const { error } = loginSchema.validate( req.body );
        if( error ){
            return res.status(404).json({ success: false, message: error.details[0].message });
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: "Invalid username or password" }) 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(user && isMatch){
            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "24h"})
            res.status(200).json({
                success: true,
                message: "Login Successfully",
                token, 
                userId: user._id
            })
        }else{
            res.status(404).json({
                success: false,
                message: "Invalid username or password"
            })
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

async function getEducatorData(req, res){
    try{
        const {userId} = req.params;
        const user = await User.findById({_id: userId}).select("-password -email");
        const course = await Course.find({createdBy: userId});
        if (!user || !course){
            return res.status(404).json({message: "User not found", success: false})
        }
        
        return res.status(200).json({user: user, totalCourse: course.length})

    }catch(err){
        console.log("Error during fetching the user data", err);
        res.status(500).json({message: "Sever Error", success: false})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getEducatorData
}