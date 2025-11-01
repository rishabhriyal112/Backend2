/*
asyncHandler is a function used in Express.js to automatically catch errors from asynchronous route handlers (those using async/await) and pass them to the Express error-handling middleware, so you don’t need to write try...catch in every route.
 */

const asyncHandler = (requestHandler)=>{
    return (req , res , next) =>{
        Promise.resolve(requestHandler(req , res , next)).catch((err)=>next(err))
    }
}

export {asyncHandler};




//const asyncHandler = () =>{}
//const asyncHandler = (func) => {()=>{}} 
//const asyncHandler = (func) => ()=>{} //we only remove the curly braces and this is called higher order functions because inside the bracket we are passing the function

//Using try-catch Method -
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }
