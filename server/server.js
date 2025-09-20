require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/main.router");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// cors({
//     origin: "*"
// methods:["GET", "POST", "DELETE", "PUT"],
// allowedHeaders: ["Content-Type", "Authorization"]
// });

app.use(cors({origin: "*"}));
app.use(express.json());



// Database connetion
mongoose.connect(MONGO_URI)
.then(()=>console.log("Database is connected"))
.catch((e)=> console.log(e));

// Routes configuration
app.use(mainRouter);

// app.use((err, req, res, next)=>{
//     console.log(err.stack);
//     res.status(500).json({
//         success: false,
//         message: "Something went wrong"
//     })
// })

app.listen(PORT, ()=>{
    console.log(`Server is now running on ${PORT}`)
})