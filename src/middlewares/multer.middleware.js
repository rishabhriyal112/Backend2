// This code sets up Multer, a Node.js middleware used for handling file uploads in Express apps.
// It defines a storage strategy that saves files temporarily in a local folder (./public/temp) before they are uploaded to Cloudinary or another cloud storage service.

// The purpose of this setup is to:
// Allow users to upload files (images, videos, etc.)
// Store them temporarily on the server.
// Then pass them to another function (like your uploadOnCloudinary) for permanent cloud upload.

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req , file , cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

export const upload = multer({ storage , })
