import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'; //jwt contain header, payload and signature
import bcrypt from 'bcrypt'; //bcrypt gonna encrypt your password 


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required : true
        },
        coverImage : {
            type : String, //cloudinary url
        },
        watchHistory : [{
            type : Schema.Types.ObjectId,
            ref : "Video"
        }],
        password : {
            type : String,
            required : [true , 'Password is Required']
        },
        refereshToken : {
            type : String
        }
    },{timestamps : true} // createdAt and updatedAt
);

//The pre keyword we are using for do any changes before saving any data so in this case before saving the passing we are encypting it
userSchema.pre("save" , async function(next){ 
    //If password is not modified then dont encrypt again 
    if(!this.isModified("password")) return next(); 
    
    //Also using .hash keyword we will encrypt our password and If the pasword is created or modified then encrypt it before saving
    this.password = bcrypt.hash(this.password , 10);
    next(); 
})

//Creating Custom Methods-
//In this case we will check the password using custom methods
userSchema.methods.isPasswordCorrect = async function (password){
    // Now we are using the compare keyword to check the password is true or false where it takes 2 parameters first one is your original or actual password and second one is your encrypted password and checks and comapare both of it and then give you will in form of true or false
    return await bcrypt.compare(password , this.password);
}

//Now we goona write functions to generate both Access and Refresh Tokens :-
//First we will write Access Token Function
userSchema.methods.generateAccessToken = function(){
    //Now inside jwt.sign we goona write our (header info , access token , expiry of access token) to generate a secure token string
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

//Now we will write Refresh token function and inside the function the code is almost similar to access token but it refreshes many times so will give write less info which is only (id) inside the header
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};


export const User = mongoose.model("User", userSchema)
