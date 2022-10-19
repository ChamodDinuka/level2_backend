const errorHandler = (error,req,res,next) =>{
    res.status(error.statusCode || 500).json({status:false,error:error.message || 'Server Error'})
}
module.exports = errorHandler