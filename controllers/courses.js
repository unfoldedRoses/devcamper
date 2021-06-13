
   const Course = require('../models/courses')
   const errorHandler = require('../utils/error');
   
   
   exports.getcourses = async (req, res) => {
     const found = await Course.find()
     if (!found) {
         return new errorHandler(`Bootcamp not found with id of `, 404)
   
     }
     res.status(200).json({
         success: true,
         data: found.length,
         message: found
     })
   }

   exports.getcoursesById = async (req, res) => {

    if (req.parmas.bootcampId) {
      const found = await Course.find({bootcamp:req.params.bootcampId})
  
    }
    res.status(200).json({
        success: true,
        data: found.length,
        message: found
    })
  }
   
   