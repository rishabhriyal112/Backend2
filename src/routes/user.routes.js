import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Route for user registration
// Before the registerUser controller runs, we use 'upload.fields()' middleware to handle file uploads.
// It allows uploading multiple files with different field names — here: 'avatar' and 'coverImage'.
router.route("/register").post(
    upload.fields([
        {
            name : "avatar",   // 'avatar' is the field name expected in the frontend form
            maxCount : 1       // Maximum number of files allowed for this field
        },
        {
            name : "coverImage",   // 'coverImage' is the field name expected in the frontend form
            maxCount : 1                // Maximum number of files allowed for this field
        }
    ]),registerUser);  // After Multer processes the uploaded files, this controller is called registerUser

export default router;
