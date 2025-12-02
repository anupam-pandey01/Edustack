const jwt = require("jsonwebtoken");
const User = require("../model/user")

const auth = async (req, res, next)=>{
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next()
    }catch (err) {
        res.status(401).json({ message: "Token Expired" });
  }
}

module.exports = auth;