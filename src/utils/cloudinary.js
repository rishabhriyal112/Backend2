// uploadOnCloudinary is an asynchronous utility function that uploads a local file (stored temporarily on your server) to Cloudinary, a cloud-based image and video hosting service.
// The purpose of this function is to store uploaded media securely on the cloud and return the Cloudinary file URL instead of keeping large files in your local server.

import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

// Create a function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;   // If no file path, return null
        //Upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto" // Automatically detect file type (image, video, etc.)
        })
        //File has been uploaded successfully
        console.log("File is Uploaded on Cloudinary " , response.url );
        return response; //Return Cloudinary’s response (contains URL, public_id, etc.)

    } catch (error) {
        fs.unlinkSync(localFilePath); //Remove the locally saved temporary file if the upload operation got failed OR If upload fails, delete the temp file from local storage
        return null;
    }
}

export {uploadOnCloudinary};

