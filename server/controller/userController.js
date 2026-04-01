const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt  = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Course = require('../model/course');
const { loginSchema, registerUserSchema, verifyCodeSchema } = require("../utils/validateSchema");
const { sendemail } = require("../Middleware/email");
const { client, connectRedis } = require("../config/cache");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");


// Controller for the Sign Up route
async function registerUser(req, res){
    try{
        const {username, password, email, role} = req.body;

        const { error } = registerUserSchema.validate(req.body);
        if( error ){
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const existUser = await User.findOne({$or: [{username}, {email}]});
        if(existUser){
            return res.status(400).json({
                success: false,
                message: "username or email already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        const newUser = {
            username,
            password: hashPassword,
            email,
            verificationCode,
            role
        }

        const { emailMsg } = await sendemail(email, verificationCode);
        
        // REDIS WORK HERE
        await client.setEx(
            `pending_user:${verificationCode}`,
            300,
            JSON.stringify(newUser)
        );

        return res.status(200).json({
            success: true,
            message: emailMsg
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Server Error: ${err.message}`
        })
    }
}

// GET DATA FROM REDIS AND VERIFY OTP FOR 5 MIN
async function verifyCode(req, res){
    const { verificationCode } = req.body;

    const { error } = verifyCodeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try{
        const userData = await client.get(`pending_user:${verificationCode}`);
    
        if (!userData){
            return res.status(400).json({ success: false, message: "Invalid or expired code"});
        }

        const verfiedUser = JSON.parse(userData);

        verfiedUser.isVerified = true;
        verfiedUser.verificationCode = undefined;
            
        const registerUser = new User(verfiedUser);
        const result = await registerUser.save();

        const accessToken = generateAccessToken(result);
        const refreshToken = generateRefreshToken(result);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.Node_env == true, // true in production process.env.Node_env == "production"
            sameSite: "Strict",
        });
        
        await client.del(`pending_user:${verificationCode}`);
        
        return res.status(200).json({
            success: true,
            message: "User registered successfully!",
            accessToken,
            userId: result._id
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Server Error: ${err.message}`
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
            return res.status(400).json({ success: false, message: "Invalid username or password" }) 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid username or password"})
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token into cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, // true in production process.env.Node_env == "production"
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({success: true, message: "Login Successfully", userId: user._id, accessToken}) 
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

async function getRefreshToken(req, res){
    try{
        const token = req.cookies.refreshToken;
        
        if (!token) {
            return res.status(404).json({ success: false, message: "Refresh token missing" });
        }

        jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid refresh token" });
            }
            const newAccessToken = generateAccessToken({ _id: decoded.userId });
            res.status(200).json({ success: true, accessToken: newAccessToken, userId: decoded.userId });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
async function logout(req, res){
    try{
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,        // true in production
            sameSite: "Strict",
        });

        res.json({ success: true, message: "Logged out successfully" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Server Error" });
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

    } catch (err) {
        console.log("Error during fetching the user data", err);
        res.status(500).json({message: "Sever Error", success: false})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getEducatorData,
    getRefreshToken,
    verifyCode,
    logout
}
