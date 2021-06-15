
   const Course = require('../models/courses')
   const Bootcamp = require('../models/bootcamps')
   const errorHandler = require('../utils/error');
   
   
   exports.getcourses = async (req, res) => {
     const found = await Course.find().populate({
       path:"bootcamp",select:"name"
     })
     if (!found) {
         return new errorHandler(`Bootcamp not found with id of `, 404)
   
     }
     res.status(200).json({
         success: true,
         data: found.length,
         message: found
     })
   }




   
   exports.addcourses = async (req, res) => {
     req.body.bootcamp=req.params.bootcampId

    const bootcamp = await Course.find().populate({
      path:"bootcamp",select:"name"
    })
    if (!bootcamp) {
        return res.status(400).send("bootcamp not found")
  
    }

    let course=await Course.create(req.body)
    res.status(200).json({
        success: true,
        data: course.length,
        message: course
    })
  }




   
  exports.updatecourses = async (req, res) => {
  
let course=Course.find(req.params.id)
  
   if (!course) {
       return res.status(400).send("course not found")
 
   }

   course=await Course.findByIdAndUpdate(req.params.id,req.body,{
     new:true,
     runValidators:true
   })
   res.status(200).json({
       success: true,
       data: course.length,
       message: course
   })
 }








   exports.getCoursesById = async (req, res, next) => {
console.log(req.params.bootcampId)
  
      const found = await Course.find({bootcamp:req.params.bootcampId})
  

    res.status(200).json({
        success: true,
        data: found.length,
        message: found
    })
  }

  exports.deleteCourse = async (req, res, next) => {
    console.log(req.params.bootcampId)
      
          const found = await Course.find({bootcamp:req.params.bootcampId})
        if(found){
          let del=Course.deleteOne(found)
        }
    
        res.status(200).json({
            success: true,
            data: found.length,
            message: found
        })
      }
       
   
   