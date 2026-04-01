require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const mainRouter = require("./routes/main.router");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
origin: process.env.CLIENT_URL,
methods:["GET", "POST", "DELETE", "PUT"],
credentials: true,
allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())



// Database connetion
mongoose.connect(MONGO_URI)
.then(()=>console.log("Database is connected"))
.catch((err) => console.error(err));

// Routes configuration
app.use(mainRouter);

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is now running on ${PORT}`)
})
