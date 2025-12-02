const userRouter = require("express").Router();
const auth = require("../Middleware/Auth")
const { registerUser, loginUser, getEducatorData } = require("../controller/userController")

userRouter.post("/register",  registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUserdetail/:userId",auth, getEducatorData);


module.exports = userRouter;