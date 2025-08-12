const express = require("express")
const mainRouter = express.Router();
const userRouter = require("./user.router");
const courseRouter = require("./course.router");

mainRouter.use(userRouter);
mainRouter.use(courseRouter);

mainRouter.get("/", (req, res)=>{
    res.send("welcome")
})

module.exports = mainRouter;