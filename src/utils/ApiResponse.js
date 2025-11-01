//ApiResponse is a custom class used to send standardized success responses in an Express.js API.
// It helps keep all your API responses consistent by including the HTTP status code, data, and a message in the same format every time.
// The main purpose of ApiResponse is to make your API responses uniform and easy to understand for both backend developers and frontend clients.

class ApiResponse {
    constructor(statusCode , data , message ="Sucess"){
        this.statusCode = statusCode
        this.data = data 
        this.message = message
        this.sucess = statusCode < 400
    }
}

export {ApiResponse};
