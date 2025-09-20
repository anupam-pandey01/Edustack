const express = require("express")
const mainRouter = express.Router();
const userRouter = require("./user.router");
const courseRouter = require("./course.router");
const educatorRouter = require("./educator.router");

mainRouter.use(userRouter);
mainRouter.use(courseRouter);
mainRouter.use(educatorRouter);

mainRouter.get("/", (req, res)=>{
    res.send("welcome")
})

module.exports = mainRouter;