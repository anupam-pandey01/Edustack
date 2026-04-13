const userRouter = require("express").Router();
const auth = require("../Middleware/Auth")
const { registerUser, loginUser, getEducatorData, verifyCode, getRefreshToken, logout } = require("../controller/userController")

userRouter.post("/register",  registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-code", verifyCode);
userRouter.post("/refresh-token", getRefreshToken);
userRouter.post("/logout", logout);
userRouter.get("/educator/:userId", auth, getEducatorData);


module.exports = userRouter;