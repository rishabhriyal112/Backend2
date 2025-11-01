// require('dotenv').config({path : './env'}); //Other way to import dotenvv
// Import required modules
import dotenv from "dotenv";
import mongoose  from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config({
    path : './.env'
})

// Connect to database and start server
connectDB()
.then(()=>{
    // Handle app-level errors
    app.on("error",(error)=>{
        console.log("Error : ",error);
        throw error
    })
    // Start server after successful DB connection
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is Running at http://localhost:${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    // Handle database connection errors
    console.log("MONGODB Connection failed !!! ",err);
    
})























/*
(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) =>{
            console.log("ERRR : ",error);
            throw error
        })

        app.listen(process.env.PORT , ()=>{
            console.log(`App is Running on http://localhost:${process.env.PORT}`);
        })
        
    } catch(error){
        console.log("Error : " , error);
        throw error
    }
})();
*/
