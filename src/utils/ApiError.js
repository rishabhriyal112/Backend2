/*
ApiError is a custom error class in Express.js used to create clear and consistent error responses. It extends the built-in Error class and adds details like status code, message, and extra error info.
Its main purpose is to standardize error handling across all API routes so you don’t have to repeat error formats.
It’s mainly used in route controllers (like when a user isn’t found) and global error-handling middleware to send clean JSON error responses
 */

// Custom error class for API responses
class ApiError extends Error {
    constructor( statusCode ,  message = "Something went wrong" ,  errors = [] , stack = "")// (HTTP status code (400, 404, 500, etc.) , Error message , Array of detailed errors ,  Stack trace (optional))
    {
        super(message)                       // Call parent Error constructor
        this.statusCode = statusCode         // Set HTTP status code
        this.data = null                     // No data in error response
        this.message = message               // Error message
        this.success = false;                // Always false for errors
        this.errors = errors                 // Additional error details

        if(stack){                           // If custom stack provided
            this.stack = stack               // Use custom stack
        }
        else{                                // Otherwise
            Error.captureStackTrace(this , this.constructor)  // Generate stack trace
        }
    }
}

export {ApiError};
