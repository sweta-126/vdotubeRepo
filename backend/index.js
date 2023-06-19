import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auths.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8800;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });

const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to db")
    }).catch((e)=>{
        throw e;
    })
}

app.use(cookieParser())
app.use(express.json());
app.use("/api/auths", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success : false,
        status,
        message
    })
})

app.listen(PORT,()=>{
    connect()
    console.log("connected to server");
})