const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Controller for the Sign Up route
async function registerUser(req, res){
    try{
        const {username, password, email, role} = req.body;

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

        const userId = await newUser.save();
        const token = jwt.sign({id: userId}, process.env.SECRET_KEY, {expiresIn: "24h"})
        return res.status(200).json({
            success: true,
            message: "User registered successfully!",
            token,
            userId
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
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}