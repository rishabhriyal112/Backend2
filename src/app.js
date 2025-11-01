// Import required middleware packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create Express application
const app = express();

// Configure CORS for cross-origin requests
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

// Parse JSON requests with size limit
app.use(express.json({limit : "16kb"}))
// Parse URL-encoded data with size limit
app.use(express.urlencoded({extended : true , limit : "16kb"}));
// Serve static files from public directory
app.use(express.static("public"));
// Parse cookies from requests
app.use(cookieParser());


//Import routes
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter); // -> http://localhost:8000/api/v1/users/register



export {app}

