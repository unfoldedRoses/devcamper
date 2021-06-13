const errorHandler =(req,err,res,next)=>{
console.log(err.stack);

res.status(err.statusCode||500).json({
    success:false,
    error:err.message||'Server Error'
})
}
module.exports=errorHandler